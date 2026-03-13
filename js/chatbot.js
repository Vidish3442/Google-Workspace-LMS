// ============================================================
// chatbot.js — AI Assistant chatbot (rule-based)
// ============================================================

const Chatbot = {
  isOpen: false,

  // Knowledge base — keyword → response
  kb: [
    // Google Calendar
    { keys: ['calendar', 'schedule', 'event', 'meeting', 'invite', 'recurring'], response: '📅 <strong>Google Calendar</strong> helps you schedule events, set reminders, and invite colleagues to meetings. You can add a Google Meet link to any event automatically. Try it at <em>calendar.google.com</em>.' },
    // Gmail
    { keys: ['gmail', 'email', 'inbox', 'bcc', 'cc', 'signature', 'compose', 'filter', 'label'], response: '📧 <strong>Gmail</strong> is Google\'s professional email tool. Key features: Labels to organize emails, Filters to auto-sort, Templates for common replies, and Signature setup. Go to Settings ⚙ → See all settings to configure everything.' },
    // Google Docs
    { keys: ['docs', 'document', 'formatting', 'heading', 'suggest', 'comment', 'version history', 'track change'], response: '📄 <strong>Google Docs</strong> is a cloud word processor. You can collaborate in real-time with colleagues. Use <em>Suggesting mode</em> for tracked changes, and <em>File → Version history</em> to see all past edits.' },
    // Google Sheets
    { keys: ['sheets', 'spreadsheet', 'formula', 'sum', 'vlookup', 'average', 'chart', 'filter', 'sort'], response: '📊 <strong>Google Sheets</strong> is for data and calculations. Common formulas: <code>=SUM(A1:A10)</code> for totals, <code>=AVERAGE(B2:B10)</code> for means, and <code>=VLOOKUP()</code> for lookups. Use <em>Insert → Chart</em> to visualize data.' },
    // Google Drive
    { keys: ['drive', 'storage', 'upload', 'share', 'folder', 'file', 'permission', 'viewer', 'editor'], response: '☁️ <strong>Google Drive</strong> stores all your files in the cloud. To share a file: right-click → Share → add email addresses → set permission (Viewer, Commenter, or Editor). Use folders to stay organized.' },
    // Google Meet
    { keys: ['meet', 'video', 'video call', 'conference', 'zoom', 'screen share'], response: '🎥 <strong>Google Meet</strong> is Google\'s video conferencing tool. Start a meeting at <em>meet.google.com</em> or directly from Google Calendar. You can share your screen using the bottom toolbar during a call.' },
    // PING
    { keys: ['ping', 'tracert', 'ipconfig', 'network', 'internet', 'connectivity', 'troubleshoot', 'ttl'], response: '🌐 To test internet connectivity, open Command Prompt and type: <code>ping 8.8.8.8</code>. If you get replies, the internet is working. Use <code>tracert google.com</code> to see the route. Use <code>ipconfig</code> to see your IP address.' },
    // Troubleshooting
    { keys: ['slow', 'not loading', 'connection', 'wifi', 'router', 'modem', 'dns', 'flush'], response: '🔧 Basic troubleshooting steps: 1) Restart your router (unplug 30 sec). 2) Restart your device. 3) Run <code>ping 8.8.8.8</code> in Command Prompt. 4) Flush DNS: <code>ipconfig /flushdns</code>. 5) Clear browser cache (Ctrl+Shift+Delete).' },
    // Certificate
    { keys: ['certificate', 'completion', 'diploma', 'finish', 'done', 'complete all'], response: '🏆 To earn your <strong>Google Workspace Training Certificate</strong>, complete all 12 lessons across the 3 modules. Then visit the Certificate page from your Dashboard to download it!' },
    // Progress / Dashboard
    { keys: ['progress', 'dashboard', 'score', 'result', 'completed'], response: '📈 Check your <strong>Dashboard</strong> to see your progress across all 3 modules, quiz scores, completed lessons, and earned achievements. Click Dashboard in the top navigation.' },
    // Email writing help
    { keys: ['write email', 'email template', 'professional email', 'how to write'], response: '✍️ Professional email structure:\n1. <strong>Subject:</strong> Clear and specific (e.g., "Meeting Request: Budget Review – March 15")\n2. <strong>Greeting:</strong> "Dear Mr./Ms. [Last Name],"\n3. <strong>Body:</strong> State purpose in first sentence, keep it concise\n4. <strong>Call to action:</strong> What you need and by when\n5. <strong>Closing:</strong> "Best regards," + your name & title' },
    // Quiz help
    { keys: ['quiz', 'test', 'question', 'practice', 'exam'], response: '📝 After each module, take a quiz to test your knowledge! Each quiz has 10 questions. You\'ll get instant feedback on each answer. Score 75%+ to earn a pass. Use the Courses page to find module quizzes.' },
    // Greetings
    { keys: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'howdy'], response: '👋 Hello! I\'m your Google Workspace Training Assistant. I can help you with questions about Gmail, Google Calendar, Docs, Sheets, Drive, and internet troubleshooting. What would you like to know?' },
    // Goodbye
    { keys: ['bye', 'goodbye', 'see you', 'thanks', 'thank you'], response: '😊 You\'re welcome! Good luck with your training! Remember, practicing with the real tools is the best way to learn. You\'ve got this! 🚀' },
    // Module 1
    { keys: ['module 1', 'day 1', 'communication', 'scheduling'], response: '📅 <strong>Module 1 (Day 1)</strong> covers Communication & Scheduling: Introduction to Google Workspace, Google Calendar, Professional Gmail, and Customer Care Basics. Start at the Courses page!' },
    // Module 2
    { keys: ['module 2', 'day 2', 'document', 'data', 'spreadsheet'], response: '📄 <strong>Module 2 (Day 2)</strong> covers Documents & Data: Google Docs formatting, Google Docs collaboration, Google Sheets basics, and Google Sheets functions. Head to the Courses page to start.' },
    // Module 3
    { keys: ['module 3', 'day 3', 'storage', 'troubleshooting', 'drive'], response: '☁️ <strong>Module 3 (Day 3)</strong> covers Storage & Troubleshooting: Google Drive basics, file organization & sharing, internet troubleshooting, and PING/network commands.' }
  ],

  suggestions: [
    'How do I create a meeting?',
    'What is VLOOKUP?',
    'How to share a file in Drive?',
    'How to write a professional email?',
    'What is the PING command?'
  ],

  init() {
    const fab = document.getElementById('chatbotFab');
    const panel = document.getElementById('chatbotPanel');
    const sendBtn = document.getElementById('chatSend');
    const input = document.getElementById('chatInput');
    const msgArea = document.getElementById('chatMessages');

    if (!fab || !panel) return;

    fab.addEventListener('click', () => this.toggle());
    sendBtn?.addEventListener('click', () => this.sendMessage());
    input?.addEventListener('keydown', (e) => { if (e.key === 'Enter') this.sendMessage(); });

    // Initial welcome message
    this.appendMessage('bot', `👋 Hi! I'm <strong>GW Assistant</strong>. I can help you with Google Workspace tools, lessons, and internet troubleshooting. What would you like to know?`);
    this.renderSuggestions();
  },

  toggle() {
    this.isOpen = !this.isOpen;
    const panel = document.getElementById('chatbotPanel');
    if (panel) panel.classList.toggle('open', this.isOpen);

    // Remove unread badge
    const badge = document.querySelector('.chatbot-fab .badge-count');
    if (badge) badge.remove();

    if (this.isOpen) {
      setTimeout(() => document.getElementById('chatInput')?.focus(), 300);
    }
  },

  sendMessage() {
    const input = document.getElementById('chatInput');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;

    this.appendMessage('user', text);
    input.value = '';

    // Remove suggestions
    document.querySelector('.chat-suggestions')?.remove();

    // Simulate typing delay
    setTimeout(() => {
      const response = this.getResponse(text);
      this.appendMessage('bot', response);
    }, 500);
  },

  sendSuggestion(text) {
    const input = document.getElementById('chatInput');
    if (input) input.value = text;
    this.sendMessage();
  },

  getResponse(text) {
    const lower = text.toLowerCase();
    for (const item of this.kb) {
      if (item.keys.some(k => lower.includes(k))) {
        return item.response;
      }
    }
    // Generic fallback
    return `🤔 I'm not sure about that specific question. You can find detailed information in the <a href="courses.html" style="color:var(--google-blue)">Courses</a> section, or try asking about: Gmail, Google Calendar, Google Docs, Google Sheets, Google Drive, or internet troubleshooting.`;
  },

  appendMessage(role, html) {
    const msgArea = document.getElementById('chatMessages');
    if (!msgArea) return;
    const div = document.createElement('div');
    div.className = `chat-msg ${role}`;
    div.innerHTML = html;
    msgArea.appendChild(div);
    msgArea.scrollTop = msgArea.scrollHeight;
  },

  renderSuggestions() {
    const msgArea = document.getElementById('chatMessages');
    if (!msgArea?.parentElement) return;
    const div = document.createElement('div');
    div.className = 'chat-suggestions';
    div.innerHTML = this.suggestions.map(s =>
      `<span class="chat-chip" onclick="Chatbot.sendSuggestion('${s}')">${s}</span>`
    ).join('');
    msgArea.parentElement.insertBefore(div, document.querySelector('.chatbot-input-area'));
  }
};

document.addEventListener('DOMContentLoaded', () => Chatbot.init());
