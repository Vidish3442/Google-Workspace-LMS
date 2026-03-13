// ============================================================
// progress.js — Track lesson completion, quiz scores, progress
// ============================================================

const Progress = {
  KEY: 'gw_progress',

  // Get or init the progress object for the current user
  getData() {
    const user = Auth.getUser();
    const key = user ? `${this.KEY}_${user.id}` : this.KEY;
    return JSON.parse(localStorage.getItem(key) || JSON.stringify({
      completedLessons: [],
      quizScores: {},
      notes: {},
      activityLog: [],
      startedAt: null
    }));
  },

  // Save progress data
  saveData(data) {
    const user = Auth.getUser();
    const key = user ? `${this.KEY}_${user.id}` : this.KEY;
    localStorage.setItem(key, JSON.stringify(data));
  },

  // Mark a lesson as complete
  markLessonComplete(lessonId) {
    const data = this.getData();
    if (!data.completedLessons.includes(lessonId)) {
      data.completedLessons.push(lessonId);
      if (!data.startedAt) data.startedAt = new Date().toISOString();
      data.activityLog.unshift({
        type: 'lesson',
        lessonId,
        timestamp: new Date().toISOString()
      });
      // Trim log to last 20 entries
      data.activityLog = data.activityLog.slice(0, 20);
      this.saveData(data);
      return true;
    }
    return false;
  },

  // Check if a lesson is complete
  isLessonComplete(lessonId) {
    return this.getData().completedLessons.includes(lessonId);
  },

  // Get module progress (0–100)
  getModuleProgress(moduleId) {
    const module = GWData.modules.find(m => m.id === moduleId);
    if (!module) return 0;
    const completed = this.getData().completedLessons;
    const done = module.lessons.filter(l => completed.includes(l.id)).length;
    return Math.round((done / module.lessons.length) * 100);
  },

  // Get completed lesson count for a module
  getModuleCompletedCount(moduleId) {
    const module = GWData.modules.find(m => m.id === moduleId);
    if (!module) return 0;
    const completed = this.getData().completedLessons;
    return module.lessons.filter(l => completed.includes(l.id)).length;
  },

  // Get total lessons completed count
  getTotalCompleted() {
    return this.getData().completedLessons.length;
  },

  // Get total lessons count
  getTotalLessons() {
    return GWData.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  },

  // Get overall progress (0–100)
  getOverallProgress() {
    const total = this.getTotalLessons();
    if (total === 0) return 0;
    return Math.round((this.getTotalCompleted() / total) * 100);
  },

  // Save a quiz score
  saveQuizScore(moduleId, score, total) {
    const data = this.getData();
    data.quizScores[moduleId] = { score, total, pct: Math.round((score / total) * 100), takenAt: new Date().toISOString() };
    data.activityLog.unshift({ type: 'quiz', moduleId, score, total, timestamp: new Date().toISOString() });
    data.activityLog = data.activityLog.slice(0, 20);
    this.saveData(data);
  },

  // Get a quiz score
  getQuizScore(moduleId) {
    const raw = this.getData().quizScores[moduleId];
    if (raw === undefined || raw === null) return null;
    if (typeof raw === 'number') {
      // Backward compatibility for legacy numeric-only score values.
      return { score: raw, total: 100, pct: raw, takenAt: null };
    }
    if (typeof raw === 'object') {
      const score = Number(raw.score ?? 0);
      const total = Number(raw.total ?? 100) || 100;
      const pct = Number(raw.pct ?? Math.round((score / total) * 100));
      return { score, total, pct, takenAt: raw.takenAt || null };
    }
    return null;
  },

  // Check if all modules are completed (for certificate eligibility)
  isCourseComplete() {
    return GWData.modules.every(m => this.getModuleProgress(m.id) === 100);
  },

  // Get activity log
  getActivityLog() {
    return this.getData().activityLog || [];
  },

  // Save/load user notes for a lesson
  saveNote(lessonId, text) {
    const data = this.getData();
    data.notes[lessonId] = { text, updatedAt: new Date().toISOString() };
    this.saveData(data);
  },

  getNote(lessonId) {
    return this.getData().notes[lessonId] || null;
  },

  // Format activity log entry for display
  formatActivity(entry) {
    if (entry.type === 'lesson') {
      // Find lesson title
      let title = entry.lessonId;
      for (const mod of GWData.modules) {
        const lesson = mod.lessons.find(l => l.id === entry.lessonId);
        if (lesson) { title = lesson.title; break; }
      }
      return { icon: 'bi-check-circle-fill', color: '#34a853', text: `Completed lesson: ${title}`, time: entry.timestamp };
    }
    if (entry.type === 'quiz') {
      const mod = GWData.modules.find(m => m.id === entry.moduleId);
      const modTitle = mod ? mod.title : entry.moduleId;
      const pct = Math.round((entry.score / entry.total) * 100);
      return { icon: 'bi-clipboard-check-fill', color: '#1a73e8', text: `Quiz: ${modTitle} — ${pct}% (${entry.score}/${entry.total})`, time: entry.timestamp };
    }
    return { icon: 'bi-activity', color: '#9c27b0', text: 'Activity', time: entry.timestamp };
  }
};
