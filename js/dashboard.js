// ============================================================
// dashboard.js — User dashboard rendering
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  if (!Auth.requireAuth()) return;

  const user = Auth.getUser();
  renderWelcome(user);
  renderStats();
  renderModuleProgress();
  renderActivityLog();
  renderAchievements();
  renderQuizScores();
});

// ── Welcome Banner ────────────────────────────────────────────
function renderWelcome(user) {
  const el = document.getElementById('welcomeUser');
  if (el) el.textContent = user.name.split(' ')[0];
  const joined = document.getElementById('userJoined');
  if (joined) joined.textContent = formatDate(user.joinedAt);
}

// ── Stats Cards ───────────────────────────────────────────────
function renderStats() {
  const totalLessons = Progress.getTotalLessons();
  const completed = Progress.getTotalCompleted();
  const overall = Progress.getOverallProgress();
  const quizzesTaken = Object.keys(Progress.getData().quizScores).length;

  const data = [
    { id: 'statCompleted', value: completed },
    { id: 'statTotal', value: totalLessons },
    { id: 'statProgress', value: overall + '%' },
    { id: 'statQuizzes', value: quizzesTaken }
  ];

  data.forEach(item => {
    const el = document.getElementById(item.id);
    if (el) el.textContent = item.value;
  });

  // Overall progress bar
  const overallBar = document.getElementById('overallProgressBar');
  if (overallBar) {
    overallBar.style.width = overall + '%';
    overallBar.setAttribute('data-width', overall + '%');
  }
    // SVG progress ring in welcome banner (circumference = 2π × 34 ≈ 213.6)
    const ringEl = document.getElementById('overallRing');
    const ringPctEl = document.getElementById('ringPct');
    if (ringEl) {
      const circumference = 213.6;
      const offset = circumference - (overall / 100) * circumference;
      setTimeout(() => { ringEl.style.strokeDashoffset = offset; }, 300);
    }
    if (ringPctEl) ringPctEl.textContent = overall + '%';
}

// ── Module Progress ───────────────────────────────────────────
function renderModuleProgress() {
  const container = document.getElementById('moduleProgressList');
  if (!container) return;

  container.innerHTML = GWData.modules.map(mod => {
    const pct = Progress.getModuleProgress(mod.id);
    const done = Progress.getModuleCompletedCount(mod.id);
    const total = mod.lessons.length;
    const quizScore = Progress.getQuizScore(mod.id);

    return `
      <div class="module-progress-item fade-in-up">
        <div class="module-progress-header">
          <div class="d-flex align-items-center gap-2">
            <div style="width:36px;height:36px;border-radius:8px;background:${mod.color}20;color:${mod.color};display:flex;align-items:center;justify-content:center;font-size:1.1rem;flex-shrink:0">
              <i class="bi ${mod.icon}"></i>
            </div>
            <div>
              <div class="module-progress-title">${mod.badge}: ${mod.title}</div>
              <div style="font-size:0.75rem;color:var(--text-muted)">${done}/${total} lessons completed</div>
            </div>
          </div>
          <div class="d-flex align-items-center gap-1">
            <span class="module-progress-pct" style="color:${mod.color}">${pct}%</span>
            ${pct === 100 ? '<i class="bi bi-check-circle-fill text-green ms-1"></i>' : ''}
          </div>
        </div>
        <div class="progress-bar-custom">
          <div class="progress-bar-fill ${mod.id}" data-width="${pct}%" style="width:${pct}%"></div>
        </div>
        <div class="d-flex justify-content-between align-items-center mt-2 flex-wrap gap-2">
          <div class="d-flex gap-2">
            ${done < total
              ? `<a href="lesson.html?module=${mod.id}&lesson=${getNextLesson(mod)}" class="btn-outline-gw" style="font-size:0.78rem;padding:0.3rem 0.75rem">
                    <i class="bi bi-play-fill me-1"></i>${done > 0 ? 'Continue' : 'Start'}
                  </a>`
              : `<a href="lesson.html?module=${mod.id}&lesson=${mod.lessons[0].id}" class="btn-outline-gw" style="font-size:0.78rem;padding:0.3rem 0.75rem">
                    <i class="bi bi-arrow-clockwise me-1"></i>Review
                  </a>`
            }
            <a href="quiz.html?module=${mod.id}" class="btn-outline-gw" style="font-size:0.78rem;padding:0.3rem 0.75rem">
              <i class="bi bi-clipboard-check me-1"></i>Quiz
            </a>
          </div>
          ${quizScore ? `<span style="font-size:0.78rem;color:${quizScore.pct>=75?'#34a853':'#fbbc04'}"><i class="bi bi-clipboard-check me-1"></i>Quiz: ${quizScore.pct}%</span>` : ''}
        </div>
      </div>`;
  }).join('');
}

// Get next incomplete lesson for a module
function getNextLesson(mod) {
  for (const lesson of mod.lessons) {
    if (!Progress.isLessonComplete(lesson.id)) return lesson.id;
  }
  return mod.lessons[0].id;
}

// ── Activity Log ──────────────────────────────────────────────
function renderActivityLog() {
  const container = document.getElementById('activityList');
  if (!container) return;

  const log = Progress.getActivityLog();
  if (!log.length) {
    container.innerHTML = '<div style="text-align:center;padding:2rem;color:var(--text-muted);font-size:0.875rem"><i class="bi bi-clock-history" style="font-size:2rem;display:block;margin-bottom:0.5rem"></i>No activity yet. Start a lesson!</div>';
    return;
  }

  container.innerHTML = log.slice(0, 10).map(entry => {
    const fmt = Progress.formatActivity(entry);
    const timeAgo = getTimeAgo(new Date(fmt.time));
    return `
      <div class="activity-item">
        <div style="width:32px;height:32px;border-radius:8px;background:${fmt.color}20;color:${fmt.color};display:flex;align-items:center;justify-content:center;font-size:0.9rem;flex-shrink:0">
          <i class="bi ${fmt.icon}"></i>
        </div>
        <div>
          <div class="activity-text">${fmt.text}</div>
          <div class="activity-time">${timeAgo}</div>
        </div>
      </div>`;
  }).join('');
}

// ── Achievements ──────────────────────────────────────────────
function renderAchievements() {
  const container = document.getElementById('achievementsList');
  if (!container) return;

  const completed = Progress.getTotalCompleted();
  const quizzesTaken = Object.keys(Progress.getData().quizScores).length;
  const courseComplete = Progress.isCourseComplete();

  const badges = [
    { icon: 'bi-rocket-takeoff-fill', color: '#1a73e8', title: 'First Step', desc: 'Complete your first lesson', unlocked: completed >= 1 },
    { icon: 'bi-star-fill', color: '#fbbc04', title: 'Halfway There', desc: 'Complete 6 lessons', unlocked: completed >= 6 },
    { icon: 'bi-clipboard-check-fill', color: '#9c27b0', title: 'Quiz Taker', desc: 'Take your first quiz', unlocked: quizzesTaken >= 1 },
    { icon: 'bi-calendar-check-fill', color: '#34a853', title: 'Day 1 Done', desc: 'Complete Module 1', unlocked: Progress.getModuleProgress('module1') === 100 },
    { icon: 'bi-file-earmark-check-fill', color: '#4285f4', title: 'Day 2 Done', desc: 'Complete Module 2', unlocked: Progress.getModuleProgress('module2') === 100 },
    { icon: 'bi-cloud-check-fill', color: '#00897b', title: 'Day 3 Done', desc: 'Complete Module 3', unlocked: Progress.getModuleProgress('module3') === 100 },
    { icon: 'bi-trophy-fill', color: '#fbbc04', title: 'Graduate!', desc: 'Complete all modules', unlocked: courseComplete },
    { icon: 'bi-award-fill', color: '#ea4335', title: 'Quiz Master', desc: 'Score 90%+ on a quiz', unlocked: Object.values(Progress.getData().quizScores).some(s => s.pct >= 90) }
  ];

  container.innerHTML = badges.map(b => `
    <div class="badge-card ${b.unlocked ? '' : 'locked'}">
      <div class="badge-icon" style="background:${b.unlocked ? b.color + '20' : 'var(--bg-secondary)'};color:${b.unlocked ? b.color : 'var(--text-muted)'}">
        <i class="bi ${b.icon}"></i>
      </div>
      <div class="badge-title">${b.title}</div>
      <div class="badge-desc">${b.desc}</div>
    </div>`).join('');
}

// ── Quiz Scores ───────────────────────────────────────────────
function renderQuizScores() {
  const container = document.getElementById('quizScoresList');
  if (!container) return;

  const scores = Progress.getData().quizScores;
  if (!Object.keys(scores).length) {
    container.innerHTML = '<p style="color:var(--text-muted);font-size:0.875rem;text-align:center;padding:1rem 0">No quizzes taken yet.</p>';
    return;
  }

  container.innerHTML = GWData.modules.map(mod => {
    const s = scores[mod.id];
    if (!s) return `
      <div style="display:flex;align-items:center;justify-content:space-between;padding:0.75rem 0;border-bottom:1px solid var(--border-color)">
        <span style="font-size:0.875rem;color:var(--text-secondary)">${mod.badge}: ${mod.title}</span>
        <a href="quiz.html?module=${mod.id}" class="btn-outline-gw" style="font-size:0.78rem;padding:0.3rem 0.75rem">Take Quiz</a>
      </div>`;
    const color = s.pct >= 90 ? '#34a853' : s.pct >= 75 ? '#1a73e8' : s.pct >= 60 ? '#fbbc04' : '#ea4335';
    return `
      <div style="padding:0.75rem 0;border-bottom:1px solid var(--border-color)">
        <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:4px">
          <span style="font-size:0.875rem;font-weight:600;color:var(--text-primary)">${mod.badge}: ${mod.title}</span>
          <span style="font-weight:700;color:${color}">${s.pct}%</span>
        </div>
        <div class="progress-bar-custom">
          <div class="progress-bar-fill" data-width="${s.pct}%" style="width:${s.pct}%;background:${color}"></div>
        </div>
        <div style="font-size:0.75rem;color:var(--text-muted);margin-top:4px">
          ${s.score}/${s.total} correct • Taken ${formatDate(s.takenAt)}
        </div>
      </div>`;
  }).join('');
}

// ── Time ago helper ───────────────────────────────────────────
function getTimeAgo(date) {
  const diff = Math.floor((Date.now() - date) / 1000);
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)} day(s) ago`;
  return formatDate(date);
}
