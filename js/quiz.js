// ============================================================
// quiz.js — Interactive quiz logic with scoring
// ============================================================

let quizState = {
  moduleId: null,
  questions: [],
  currentIndex: 0,
  answers: [],   // user's selected answer index for each question
  revealed: [],  // which questions have been answered (answer revealed)
  score: 0
};

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const moduleId = params.get('module') || 'module1';
  initQuiz(moduleId);
});

function initQuiz(moduleId) {
  const module = GWData.modules.find(m => m.id === moduleId);
  const questions = GWData.quizzes[moduleId];

  if (!module || !questions) {
    document.getElementById('quizMain').innerHTML = '<div class="alert alert-danger">Quiz not found.</div>';
    return;
  }

  quizState = { moduleId, questions, currentIndex: 0, answers: new Array(questions.length).fill(null), revealed: new Array(questions.length).fill(false), score: 0 };

  // Update header
  const titleEl = document.getElementById('quizModuleTitle');
  if (titleEl) titleEl.textContent = `${module.badge}: ${module.title}`;

  renderQuestion(0);
}

// ── Render a question ─────────────────────────────────────────
function renderQuestion(index) {
  const q = quizState.questions[index];
  const total = quizState.questions.length;
  const userAnswer = quizState.answers[index];
  const isRevealed = quizState.revealed[index];

  // Progress bar
  updateQuizProgress(index, total);

  const questionArea = document.getElementById('questionArea');
  if (!questionArea) return;

  const optionLetters = ['A', 'B', 'C', 'D', 'E'];

  questionArea.innerHTML = `
    <div class="question-card fade-in-up visible">
      <div class="question-number">Question ${index + 1} of ${total}</div>
      <div class="question-text">${q.question}</div>
      <ul class="quiz-options" id="optionsList">
        ${q.options.map((opt, i) => {
          let cls = '';
          if (isRevealed) {
            if (i === q.answer) cls = 'correct';
            else if (i === userAnswer && i !== q.answer) cls = 'incorrect';
          } else if (i === userAnswer) {
            cls = 'selected';
          }
          return `
            <li class="quiz-option ${cls} ${isRevealed ? 'disabled' : ''}" onclick="${!isRevealed ? `selectAnswer(${i})` : ''}">
              <div class="option-letter">${optionLetters[i]}</div>
              <span>${opt}</span>
              ${isRevealed && i === q.answer ? '<i class="bi bi-check-circle-fill ms-auto text-green" style="flex-shrink:0"></i>' : ''}
              ${isRevealed && i === userAnswer && i !== q.answer ? '<i class="bi bi-x-circle-fill ms-auto text-red" style="flex-shrink:0"></i>' : ''}
            </li>`;
        }).join('')}
      </ul>

      ${isRevealed ? `
        <div class="quiz-feedback show ${userAnswer === q.answer ? 'correct-fb' : 'wrong-fb'}">
          <i class="bi ${userAnswer === q.answer ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}"></i>
          <span>${userAnswer === q.answer
            ? '✅ Correct! Well done.'
            : `❌ The correct answer is: <strong>${q.options[q.answer]}</strong>`}
          </span>
        </div>` : ''}
    </div>

    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mt-2">
      <button class="btn-outline-gw" onclick="prevQuestion()" ${index === 0 ? 'disabled' : ''}>
        <i class="bi bi-arrow-left me-1"></i>Previous
      </button>
      ${!isRevealed
        ? `<button class="btn-primary-gw" onclick="submitAnswer()" id="submitBtn" ${userAnswer === null ? 'disabled style="opacity:.5;cursor:not-allowed"' : ''}>
             <i class="bi bi-check2 me-1"></i>Submit Answer
           </button>`
        : index < quizState.questions.length - 1
          ? `<button class="btn-primary-gw" onclick="nextQuestion()">Next<i class="bi bi-arrow-right ms-1"></i></button>`
          : `<button class="btn-primary-gw" onclick="showResults()"><i class="bi bi-trophy me-1"></i>See Results</button>`
      }
    </div>`;
}

// ── Select an answer ──────────────────────────────────────────
function selectAnswer(optionIndex) {
  if (quizState.revealed[quizState.currentIndex]) return;
  quizState.answers[quizState.currentIndex] = optionIndex;

  // Re-render options to show selection
  const options = document.querySelectorAll('.quiz-option');
  options.forEach((el, i) => {
    el.classList.toggle('selected', i === optionIndex);
  });

  // Enable submit button
  const submitBtn = document.getElementById('submitBtn');
  if (submitBtn) {
    submitBtn.disabled = false;
    submitBtn.style.opacity = '';
    submitBtn.style.cursor = '';
  }
}

// ── Submit (reveal) answer ────────────────────────────────────
function submitAnswer() {
  const idx = quizState.currentIndex;
  if (quizState.answers[idx] === null) return;
  quizState.revealed[idx] = true;
  if (quizState.answers[idx] === quizState.questions[idx].answer) {
    quizState.score++;
  }
  renderQuestion(idx);
  updateQuizProgress(idx, quizState.questions.length);
}

// ── Navigation ────────────────────────────────────────────────
function nextQuestion() {
  if (quizState.currentIndex < quizState.questions.length - 1) {
    quizState.currentIndex++;
    renderQuestion(quizState.currentIndex);
  }
}

function prevQuestion() {
  if (quizState.currentIndex > 0) {
    quizState.currentIndex--;
    renderQuestion(quizState.currentIndex);
  }
}

// ── Progress bar update ───────────────────────────────────────
function updateQuizProgress(index, total) {
  const answeredCount = quizState.revealed.filter(Boolean).length;
  const pct = Math.round((answeredCount / total) * 100);

  const progressBar = document.getElementById('quizProgressBar');
  const progressText = document.getElementById('quizProgressText');
  const questionCounter = document.getElementById('questionCounter');

  if (progressBar) progressBar.style.width = pct + '%';
  if (progressText) progressText.textContent = `${answeredCount} of ${total} answered`;
  if (questionCounter) questionCounter.textContent = `${index + 1} / ${total}`;
}

// ── Show Results ──────────────────────────────────────────────
function showResults() {
  const score = quizState.score;
  const total = quizState.questions.length;
  const pct = Math.round((score / total) * 100);

  // Save score
  if (Auth.isLoggedIn()) {
    Progress.saveQuizScore(quizState.moduleId, score, total);
  }

  const grade = pct >= 90 ? { label: 'Excellent!', color: '#34a853', icon: 'bi-trophy-fill' }
              : pct >= 75 ? { label: 'Good Job!', color: '#1a73e8', icon: 'bi-star-fill' }
              : pct >= 60 ? { label: 'Keep Going!', color: '#fbbc04', icon: 'bi-emoji-smile-fill' }
              :              { label: 'Keep Practicing', color: '#ea4335', icon: 'bi-book-fill' };

  const module = GWData.modules.find(m => m.id === quizState.moduleId);
  const reviewItems = quizState.questions.map((q, i) => {
    const userAns = quizState.answers[i];
    const correct = userAns === q.answer;
    return `
      <div style="padding:0.75rem;border:1px solid var(--border-color);border-radius:var(--border-radius-sm);margin-bottom:0.5rem;background:${correct ? 'rgba(52,168,83,.04)' : 'rgba(234,67,53,.04)'}">
        <div style="display:flex;gap:0.5rem;align-items:flex-start">
          <i class="bi ${correct ? 'bi-check-circle-fill' : 'bi-x-circle-fill'}" style="color:${correct ? '#34a853' : '#ea4335'};margin-top:2px;flex-shrink:0"></i>
          <div>
            <div style="font-size:0.875rem;font-weight:600;color:var(--text-primary);margin-bottom:4px">${q.question}</div>
            ${!correct ? `<div style="font-size:0.8rem;color:var(--text-secondary)">Correct: <strong>${q.options[q.answer]}</strong></div>` : ''}
          </div>
        </div>
      </div>`;
  }).join('');

  const questionArea = document.getElementById('questionArea');
  if (!questionArea) return;

  questionArea.innerHTML = `
    <div class="quiz-results-card">
      <div class="cert-seal" style="background:${grade.color};background:linear-gradient(135deg,${grade.color},${grade.color}cc)">
        <i class="bi ${grade.icon}"></i>
      </div>
      <h2 style="font-weight:800;font-size:1.5rem;margin-bottom:0.25rem">${grade.label}</h2>
      <p style="color:var(--text-muted);font-size:0.9rem;margin-bottom:1.5rem">Module: ${module ? module.title : quizState.moduleId}</p>

      <div style="display:flex;gap:1.5rem;justify-content:center;flex-wrap:wrap;margin-bottom:2rem">
        <div style="text-align:center">
          <div style="font-size:2.5rem;font-weight:800;color:${grade.color}">${score}</div>
          <div style="font-size:0.8rem;color:var(--text-muted)">Correct</div>
        </div>
        <div style="text-align:center">
          <div style="font-size:2.5rem;font-weight:800;color:var(--text-secondary)">${total - score}</div>
          <div style="font-size:0.8rem;color:var(--text-muted)">Incorrect</div>
        </div>
        <div style="text-align:center">
          <div style="font-size:2.5rem;font-weight:800;color:var(--google-blue)">${pct}%</div>
          <div style="font-size:0.8rem;color:var(--text-muted)">Score</div>
        </div>
      </div>

      <div style="background:var(--bg-secondary);border-radius:var(--border-radius-sm);height:12px;margin-bottom:2rem;overflow:hidden;">
        <div style="height:100%;background:${grade.color};border-radius:inherit;width:${pct}%;transition:width 1s ease;"></div>
      </div>

      <div class="d-flex gap-3 justify-content-center flex-wrap mb-3">
        <a href="${module ? 'courses.html#' + module.id : 'courses.html'}" class="btn-outline-gw">
          <i class="bi bi-arrow-left me-1"></i>Back to Module
        </a>
        <button class="btn-outline-gw" onclick="retakeQuiz()">
          <i class="bi bi-arrow-repeat me-1"></i>Retake Quiz
        </button>
        ${pct >= 75 ? `<a href="certificate.html" class="btn-primary-gw" style="text-decoration:none">
          <i class="bi bi-award me-1"></i>View Certificate
        </a>` : ''}
      </div>
    </div>

    <div style="background:var(--bg-primary);border:1px solid var(--border-color);border-radius:var(--border-radius);padding:1.5rem;margin-top:1rem">
      <h5 style="font-weight:700;margin-bottom:1rem"><i class="bi bi-list-check me-2 text-blue"></i>Question Review</h5>
      ${reviewItems}
    </div>`;

  // Hide progress bar
  const progressSection = document.getElementById('quizProgressSection');
  if (progressSection) progressSection.style.display = 'none';
}

// ── Retake quiz ───────────────────────────────────────────────
function retakeQuiz() {
  const params = new URLSearchParams(window.location.search);
  initQuiz(params.get('module') || 'module1');
  const progressSection = document.getElementById('quizProgressSection');
  if (progressSection) progressSection.style.display = '';
}
