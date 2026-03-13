// ============================================================
// lesson.js — Lesson page logic
// Renders lesson content dynamically from data.js
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // Parse URL params
  const params = new URLSearchParams(window.location.search);
  const moduleId = params.get('module') || 'module1';
  const lessonId = params.get('lesson');

  const module = getModule(moduleId);
  if (!module) { window.location.href = 'courses.html'; return; }

  // Determine which lesson to show (default: first)
  const lesson = lessonId ? getLesson(moduleId, lessonId) : module.lessons[0];
  if (!lesson) { window.location.href = 'courses.html'; return; }

  // Render everything
  renderSidebar(module, lesson);
  renderLesson(module, lesson);
  setupNavigation(module, lesson);
  markCurrentLesson(lesson);

  // Track visited lesson in session
  if (Auth.isLoggedIn()) {
    updatePageTitle(lesson.title);
  }
});

let ytApiPromise = null;
let ytPlayer = null;
let videoAutoCompleted = false;

// ── Sidebar ──────────────────────────────────────────────────
function renderSidebar(module, currentLesson) {
  const sidebar = document.getElementById('lessonSidebar');
  if (!sidebar) return;

  sidebar.innerHTML = `
    <div class="lesson-sidebar-header">
      <div style="font-size:0.7rem;font-weight:600;text-transform:uppercase;letter-spacing:0.5px;color:var(--google-blue);margin-bottom:2px">${module.badge}</div>
      <div class="lesson-sidebar-title">${module.title}</div>
      <div style="margin-top:0.5rem;">
        <div style="display:flex;justify-content:space-between;font-size:0.75rem;color:var(--text-muted);margin-bottom:4px">
          <span>Progress</span><span>${Progress.getModuleProgress(module.id)}%</span>
        </div>
        <div class="progress-bar-custom"><div class="progress-bar-fill ${module.id}" data-width="${Progress.getModuleProgress(module.id)}%" style="width:${Progress.getModuleProgress(module.id)}%"></div></div>
      </div>
    </div>
    ${module.lessons.map(l => {
      const done = Progress.isLessonComplete(l.id);
      const isCurrent = l.id === currentLesson.id;
      return `
        <div class="sidebar-lesson-item ${isCurrent ? 'active' : ''} ${done ? 'completed' : ''}"
             onclick="navigateToLesson('${module.id}', '${l.id}')">
          <div class="si-num">${done ? '<i class="bi bi-check-lg"></i>' : l.order}</div>
          <span class="flex-1">${l.title}</span>
          <span style="font-size:0.7rem;color:var(--text-muted);flex-shrink:0">${l.duration}</span>
        </div>`;
    }).join('')}
    <div style="padding:1rem;border-top:1px solid var(--border-color);">
      <a href="quiz.html?module=${module.id}" class="btn-primary-gw w-100" style="justify-content:center;text-decoration:none;font-size:0.875rem;">
        <i class="bi bi-clipboard-check"></i> Take Module Quiz
      </a>
    </div>`;
}

// ── Navigate to lesson ────────────────────────────────────────
function navigateToLesson(moduleId, lessonId) {
  window.location.href = `lesson.html?module=${moduleId}&lesson=${lessonId}`;
}

// ── Render full lesson content ────────────────────────────────
function renderLesson(module, lesson) {
  const container = document.getElementById('lessonContent');
  if (!container) return;

  const done = Progress.isLessonComplete(lesson.id);
  const savedNote = Progress.getNote(lesson.id);

  container.innerHTML = `
    <div class="lesson-content-area">
      <div class="lesson-header">
        <div class="d-flex align-items-center gap-2 mb-3">
          <a href="courses.html" style="font-size:0.8rem;color:var(--text-muted);text-decoration:none;"><i class="bi bi-arrow-left me-1"></i>Courses</a>
          <span style="color:var(--text-muted)">/</span>
          <a href="courses.html#${module.id}" style="font-size:0.8rem;color:var(--text-muted);text-decoration:none;">${module.title}</a>
          <span style="color:var(--text-muted)">/</span>
          <span style="font-size:0.8rem;color:var(--text-secondary)">${lesson.title}</span>
        </div>
        <div class="d-flex align-items-start justify-content-between flex-wrap gap-2">
          <div>
            <div class="d-flex align-items-center gap-2 mb-2">
              <span class="chip"><i class="bi bi-clock me-1"></i>${lesson.duration}</span>
              <span class="chip" style="background:${module.color}20;border-color:${module.color}40;color:${module.color}">${module.badge}</span>
              ${done ? '<span class="chip" style="background:rgba(52,168,83,.1);border-color:rgba(52,168,83,.3);color:#34a853"><i class="bi bi-check-circle-fill me-1"></i>Completed</span>' : ''}
            </div>
            <h1 class="lesson-header-title" style="font-size:1.6rem;font-weight:800;margin:0">${lesson.title}</h1>
          </div>
        </div>

        <!-- Objectives -->
        <div class="mt-3 p-3" style="background:rgba(26,115,232,.06);border:1px solid rgba(26,115,232,.15);border-radius:var(--border-radius-sm);">
          <div style="font-size:0.8rem;font-weight:700;color:var(--google-blue);margin-bottom:0.5rem;text-transform:uppercase;letter-spacing:0.5px;"><i class="bi bi-bullseye me-1"></i>Learning Objectives</div>
          <ul style="margin:0;padding-left:1.25rem;" class="mb-0">
            ${lesson.objectives.map(o => `<li style="font-size:0.875rem;color:var(--text-secondary);margin-bottom:2px">${o}</li>`).join('')}
          </ul>
        </div>
      </div>

      <!-- Video Section -->
      <div class="lesson-body" id="videoSection">
        <div class="lesson-section">
          <h3><i class="bi bi-play-circle me-2 text-blue"></i>Video Tutorial</h3>
          <div class="video-placeholder" onclick="loadYouTubeVideo('${lesson.videoId}', '${lesson.videoTitle}', '${module.id}', '${lesson.id}')" id="videoPlaceholder">
            <div class="video-play-btn"><i class="bi bi-play-fill"></i></div>
            <div style="text-align:center">
              <div style="font-weight:700;font-size:1rem;margin-bottom:4px">${lesson.videoTitle}</div>
              <div style="font-size:0.8rem;opacity:0.75">Click to load video tutorial</div>
            </div>
          </div>
          ${Array.isArray(lesson.videoLinks) && lesson.videoLinks.length
            ? `<div style="margin-top:0.9rem;padding:0.9rem;border:1px solid var(--border-color);border-radius:var(--border-radius-sm);background:var(--bg-secondary)">
                <div style="font-size:0.8rem;font-weight:700;color:var(--text-secondary);margin-bottom:0.45rem;text-transform:uppercase;letter-spacing:0.5px">Related Videos</div>
                <ul style="margin:0;padding-left:1.1rem;display:grid;gap:0.35rem;">
                  ${lesson.videoLinks.map(v => `<li><a href="${v.url}" target="_blank" rel="noopener noreferrer">${v.title}</a></li>`).join('')}
                </ul>
              </div>`
            : ''}
        </div>
      </div>

      <!-- Lesson Content -->
      <div class="lesson-body" id="lessonBody">
        ${lesson.sections.map(section => renderSection(section)).join('')}
      </div>

      <!-- Notes Section -->
      <div class="lesson-body" style="border-top:1px solid var(--border-color)">
        <div class="lesson-section">
          <h3><i class="bi bi-journal-text me-2 text-blue"></i>My Notes</h3>
          <textarea class="notes-textarea" id="lessonNotes" placeholder="Write your personal notes here…">${savedNote ? savedNote.text : ''}</textarea>
          <div class="d-flex gap-2 mt-2">
            <button class="btn-outline-gw" onclick="saveNote()"><i class="bi bi-save me-1"></i>Save Note</button>
            ${savedNote ? `<span style="font-size:0.75rem;color:var(--text-muted);align-self:center;"><i class="bi bi-clock me-1"></i>Last saved: ${formatDate(savedNote.updatedAt)}</span>` : ''}
          </div>
        </div>
      </div>

      <!-- Mark Complete & Navigation -->
      <div class="lesson-body" style="border-top:1px solid var(--border-color)">
        <div class="d-flex align-items-center justify-content-between flex-wrap gap-2">
          <div id="prevLessonBtn"></div>
          <button class="btn-primary-gw" id="markCompleteBtn" onclick="handleMarkComplete('${module.id}', '${lesson.id}')">
            ${done
              ? '<i class="bi bi-check-circle-fill me-2"></i>Lesson Completed!'
              : '<i class="bi bi-check2-circle me-2"></i>Mark as Complete'}
          </button>
          <div id="nextLessonBtn"></div>
        </div>
      </div>
    </div>`;
}

// ── Render a content section ──────────────────────────────────
function renderSection(section) {
  let inner = '';

  switch (section.type) {
    case 'text':
      inner = `<p class="lesson-text-content">${section.content.replace(/\n/g, '<br>')}</p>`;
      break;

    case 'bullets':
      inner = `<ul class="lesson-bullet-list">${section.items.map(item => `<li>${item}</li>`).join('')}</ul>`;
      break;

    case 'steps':
      inner = `<ol class="steps-list">
        ${section.steps.map(s => `
          <li class="step-item">
            <div class="step-num">${s.step}</div>
            <div class="step-content"><h5>${s.title}</h5><p>${s.desc}</p></div>
          </li>`).join('')}
      </ol>`;
      break;

    case 'cards':
      inner = `<div class="info-card-grid">
        ${section.items.map(item => `
          <div class="info-card-item">
            <span class="info-card-icon" style="color:${item.color}"><i class="bi ${item.icon}"></i></span>
            <div class="info-card-title">${item.title}</div>
            <div class="info-card-desc">${item.desc}</div>
          </div>`).join('')}
      </div>`;
      break;

    case 'table':
      inner = `<div class="table-wrapper">
        <table class="lesson-table">
          <thead><tr>${section.headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
          <tbody>${section.rows.map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('')}</tbody>
        </table>
      </div>`;
      break;

    case 'examples':
      inner = section.items.map(ex => `
        <div class="email-example">
          <div class="email-example-header">${ex.label}</div>
          ${ex.subject ? `<div class="email-subject-line"><span>Subject:</span>${ex.subject}</div>` : ''}
          <div class="email-body-text">${ex.body}</div>
        </div>`).join('');
      break;

    default:
      inner = `<p class="lesson-text-content">${section.content || ''}</p>`;
  }

  return `
    <div class="lesson-section fade-in-up">
      <h3>${section.title}</h3>
      ${inner}
    </div>`;
}

// ── Video loading ─────────────────────────────────────────────
function loadYouTubeVideo(videoId, title, moduleId, lessonId) {
  const placeholder = document.getElementById('videoPlaceholder');
  if (!placeholder) return;

  videoAutoCompleted = false;
  const resolvedId = (videoId || '').includes('http') ? extractYouTubeVideoId(videoId) : videoId;
  if (!resolvedId) return;

  // Create target wrapper first; if YT API fails, fallback to plain iframe.
  placeholder.outerHTML = `
    <div class="video-container">
      <div id="lessonVideoPlayer"></div>
    </div>`;

  ensureYouTubeApi()
    .then(() => {
      const host = window.location.protocol === 'https:' ? 'https://www.youtube.com' : undefined;

      if (ytPlayer && typeof ytPlayer.destroy === 'function') {
        ytPlayer.destroy();
      }

      ytPlayer = new window.YT.Player('lessonVideoPlayer', {
        videoId: resolvedId,
        ...(host ? { host } : {}),
        playerVars: {
          autoplay: 1,
          rel: 0,
          modestbranding: 1
        },
        events: {
          onStateChange: event => {
            if (event.data === window.YT.PlayerState.ENDED) {
              autoMarkCompleteFromVideo(moduleId, lessonId);
            }
          }
        }
      });
    })
    .catch(() => {
      renderVideoFallback(resolvedId, title, moduleId, lessonId);
    });
}

function ensureYouTubeApi() {
  if (window.YT && window.YT.Player) return Promise.resolve();
  if (ytApiPromise) return ytApiPromise;

  ytApiPromise = new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('YouTube API load timeout'));
    }, 4000);

    const previousReady = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      if (typeof previousReady === 'function') previousReady();
      clearTimeout(timeoutId);
      resolve();
    };

    let script = document.querySelector('script[data-yt-api="true"]');
    if (!script) {
      script = document.createElement('script');
      script.src = 'https://www.youtube.com/iframe_api';
      script.async = true;
      script.setAttribute('data-yt-api', 'true');
      script.onerror = () => {
        clearTimeout(timeoutId);
        reject(new Error('YouTube API failed to load'));
      };
      document.head.appendChild(script);
    }
  });

  return ytApiPromise;
}

function renderVideoFallback(videoId, title, moduleId, lessonId) {
  const target = document.getElementById('lessonVideoPlayer');
  if (!target) return;

  target.outerHTML = `
    <div>
      <iframe src="https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0"
        title="${title}" allowfullscreen allow="autoplay; encrypted-media" loading="lazy" style="width:100%;aspect-ratio:16/9;border:0;border-radius:12px;">
      </iframe>
      <div style="margin-top:0.75rem;display:flex;justify-content:flex-end;">
        <button class="btn-outline-gw" onclick="handleMarkComplete('${moduleId}','${lessonId}')">
          <i class="bi bi-check2-circle me-1"></i>Mark Video Complete
        </button>
      </div>
    </div>`;
}

function autoMarkCompleteFromVideo(moduleId, lessonId) {
  if (videoAutoCompleted) return;
  if (!Auth.isLoggedIn()) return;
  if (Progress.isLessonComplete(lessonId)) return;

  videoAutoCompleted = true;
  handleMarkComplete(moduleId, lessonId);
}

function extractYouTubeVideoId(urlOrId) {
  if (!urlOrId) return '';
  const value = String(urlOrId).trim();
  if (!value.includes('http')) return value;
  try {
    const u = new URL(value);
    if (u.hostname.includes('youtu.be')) return u.pathname.replace('/', '');
    return u.searchParams.get('v') || '';
  } catch (_) {
    return '';
  }
}

// ── Navigation (Previous / Next lesson) ──────────────────────
function setupNavigation(module, lesson) {
  const prev = getAdjacentLesson(module.id, lesson.id, 'prev');
  const next = getAdjacentLesson(module.id, lesson.id, 'next');

  const prevBtn = document.getElementById('prevLessonBtn');
  const nextBtn = document.getElementById('nextLessonBtn');

  if (prevBtn && prev) {
    prevBtn.innerHTML = `<a href="lesson.html?module=${module.id}&lesson=${prev.id}" class="btn-outline-gw"><i class="bi bi-arrow-left me-1"></i>${prev.title}</a>`;
  } else if (prevBtn) {
    prevBtn.innerHTML = `<a href="courses.html" class="btn-outline-gw"><i class="bi bi-arrow-left me-1"></i>All Courses</a>`;
  }

  if (nextBtn && next) {
    nextBtn.innerHTML = `<a href="lesson.html?module=${module.id}&lesson=${next.id}" class="btn-outline-gw">${next.title}<i class="bi bi-arrow-right ms-1"></i></a>`;
  } else if (nextBtn) {
    nextBtn.innerHTML = `<a href="quiz.html?module=${module.id}" class="btn-primary-gw" style="text-decoration:none"><i class="bi bi-clipboard-check me-1"></i>Take Module Quiz</a>`;
  }
}

// ── Mark Lesson Complete ──────────────────────────────────────
function handleMarkComplete(moduleId, lessonId) {
  if (!Auth.isLoggedIn()) {
    Toast.show('Please log in to track your progress.', 'warning');
    setTimeout(() => { window.location.href = `login.html?redirect=${encodeURIComponent(window.location.href)}`; }, 1200);
    return;
  }

  const isNew = Progress.markLessonComplete(lessonId);
  const btn = document.getElementById('markCompleteBtn');

  if (btn) {
    btn.innerHTML = '<i class="bi bi-check-circle-fill me-2"></i>Lesson Completed!';
    btn.style.background = '#34a853';
    btn.disabled = true;
  }

  if (isNew) {
    Toast.show('Lesson completed! Great work! 🎉', 'success');
    // Re-render sidebar to update progress
    const params = new URLSearchParams(window.location.search);
    const module = getModule(params.get('module') || moduleId);
    const lesson = getLesson(moduleId, lessonId);
    if (module && lesson) renderSidebar(module, lesson);
  } else {
    Toast.show('This lesson was already marked as complete.', 'info');
  }
}

// ── Save Note ─────────────────────────────────────────────────
function saveNote() {
  const textarea = document.getElementById('lessonNotes');
  if (!textarea) return;
  const params = new URLSearchParams(window.location.search);
  const lessonId = params.get('lesson');
  Progress.saveNote(lessonId, textarea.value);
  Toast.show('Note saved!', 'success', 2000);
}

// ── Mark current lesson in sidebar ───────────────────────────
function markCurrentLesson(lesson) {
  document.title = `${lesson.title} — GW Training`;
}

function updatePageTitle(title) {
  document.title = `${title} — GW Training`;
}
