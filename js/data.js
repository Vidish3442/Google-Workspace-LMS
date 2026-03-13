// ============================================================
// Google Workspace Training - Core Data
// All lesson content, quiz questions, and resources
// ============================================================

const GWData = {

  // ── MODULES ──────────────────────────────────────────────
  modules: [
    {
      id: 'module1',
      day: 1,
      title: 'Communication & Scheduling',
      description: 'Master Gmail, Google Calendar, and professional workplace communication skills.',
      icon: 'bi-calendar-check',
      color: '#1a73e8',
      badge: 'Day 1',
      lessons: [
        {
          id: 'l1-1',
          moduleId: 'module1',
          order: 1,
          title: 'Introduction to Google Workspace',
          duration: '15 min',
          icon: 'bi-grid-3x3-gap',
          videoTitle: 'Google Workspace Overview',
          videoId: '9oUJA7AK27A',
          videoLinks: [
            { title: 'Google Workspace Overview', url: 'https://www.youtube.com/watch?v=9oUJA7AK27A' }
          ],
          objectives: [
            'Understand what Google Workspace is and its history',
            'Identify the core tools included in Google Workspace',
            'Recognize the benefits of cloud-based productivity',
            'Know how to access Google Workspace tools'
          ],
          sections: [
            {
              title: 'What is Google Workspace?',
              type: 'text',
              content: 'Google Workspace (formerly known as G Suite and Google Apps) is a collection of cloud-based productivity and collaboration tools developed by Google. It brings together email, document editing, file storage, video conferencing, and calendar management into one unified platform. All tools are accessible through a web browser, meaning you can work from any device, anywhere in the world, without installing software.'
            },
            {
              title: 'Core Tools at a Glance',
              type: 'cards',
              items: [
                { icon: 'bi-envelope', title: 'Gmail', desc: 'Professional email service with smart compose and AI-powered features.', color: '#ea4335' },
                { icon: 'bi-calendar3', title: 'Google Calendar', desc: 'Schedule meetings, set reminders, and manage your time effectively.', color: '#1a73e8' },
                { icon: 'bi-file-earmark-text', title: 'Google Docs', desc: 'Create and collaborate on documents in real time.', color: '#4285f4' },
                { icon: 'bi-table', title: 'Google Sheets', desc: 'Build spreadsheets, analyze data, and automate calculations.', color: '#34a853' },
                { icon: 'bi-cloud', title: 'Google Drive', desc: 'Store, organize, and share files securely in the cloud.', color: '#fbbc04' },
                { icon: 'bi-camera-video', title: 'Google Meet', desc: 'High-quality video conferencing for remote collaboration.', color: '#00897b' }
              ]
            },
            {
              title: 'Why Use Google Workspace?',
              type: 'bullets',
              items: [
                'Access everything from any device with a browser and internet connection',
                'Collaborate with teammates simultaneously on the same document',
                'Automatic saving — never lose your work again',
                'Powerful search powered by Google\'s technology',
                'Integrated tools that work seamlessly together',
                'Robust security and admin controls for organizations',
                'Free personal version (15 GB storage) with paid tiers for business'
              ]
            },
            {
              title: 'Getting Started: Your First Steps',
              type: 'steps',
              steps: [
                { step: 1, title: 'Sign in to Google', desc: 'Go to workspace.google.com or gmail.com and sign in with your Google account.' },
                { step: 2, title: 'Explore the App Launcher', desc: 'Click the 9-dot grid (⠿) in the top-right corner to see all available apps.' },
                { step: 3, title: 'Set Up Your Profile', desc: 'Add a profile photo and update your name for a professional presence.' },
                { step: 4, title: 'Customize Settings', desc: 'Visit Settings (⚙) in Gmail and Calendar to configure your preferences.' },
                { step: 5, title: 'Connect with Your Team', desc: 'Share your calendar and create a shared Drive folder for collaboration.' }
              ]
            },
            {
              title: 'Key Differences: Personal vs. Workspace Account',
              type: 'table',
              headers: ['Feature', 'Personal (free)', 'Google Workspace'],
              rows: [
                ['Storage', '15 GB', '30 GB – Unlimited'],
                ['Email domain', '@gmail.com', 'Your custom domain'],
                ['Admin controls', 'None', 'Full admin panel'],
                ['Video meetings', 'Up to 100 people', 'Up to 500 people'],
                ['Security', 'Standard', 'Enhanced + compliance']
              ]
            }
          ]
        },
        {
          id: 'l1-2',
          moduleId: 'module1',
          order: 2,
          title: 'Google Calendar',
          duration: '20 min',
          icon: 'bi-calendar3',
          videoTitle: 'Google Calendar Tutorial',
          videoId: 'XNGqA6I1b24',
          videoLinks: [
            { title: 'Google Calendar Tutorial', url: 'https://www.youtube.com/watch?v=XNGqA6I1b24' },
            { title: 'Sending Google Calendar Invites', url: 'https://www.youtube.com/watch?v=Q4lZqj4c7q4' },
            { title: 'Managing Google Calendar Responses', url: 'https://www.youtube.com/watch?v=6vX6j6o7N3A' },
            { title: 'Multiple Time Zones in Calendar', url: 'https://www.youtube.com/watch?v=AYy6P9tV2t4' }
          ],
          objectives: [
            'Create, edit, and delete calendar events',
            'Invite participants and manage responses',
            'Use recurring events and set reminders',
            'Share calendars and check colleague availability'
          ],
          sections: [
            {
              title: 'What is Google Calendar?',
              type: 'text',
              content: 'Google Calendar is a scheduling application that helps you manage your time, organize events, and coordinate with others. It integrates directly with Gmail (detecting event invitations automatically), Google Meet (adding video links to meetings), and Google Drive (attaching documents). In a professional environment, Google Calendar is the backbone of meeting management and team scheduling.'
            },
            {
              title: 'Key Features',
              type: 'bullets',
              items: [
                'Create one-time or recurring events with custom recurrence rules',
                'Add participants and track RSVPs (Accept / Decline / Maybe)',
                'Attach Google Meet video conferencing links with one click',
                'Color-code events by category (work, personal, project)',
                'Share your calendar with specific people or your whole organization',
                'View colleagues\' free/busy status to find meeting slots',
                'Set email and pop-up reminders',
                'Manage multiple calendars (personal, work, team) in one view'
              ]
            },
            {
              title: 'Creating a Meeting — Step by Step',
              type: 'steps',
              steps: [
                { step: 1, title: 'Open Google Calendar', desc: 'Navigate to calendar.google.com or click Calendar in the app launcher.' },
                { step: 2, title: 'Click a Date & Time', desc: 'Click on the desired time slot in the calendar view or press the "+ Create" button.' },
                { step: 3, title: 'Add Event Title', desc: 'Enter a clear, descriptive title like "Q1 Sales Review – March 15".' },
                { step: 4, title: 'Set Date, Time & Duration', desc: 'Configure the start and end times. Enable "All day" for full-day events.' },
                { step: 5, title: 'Add Video Conference', desc: 'Click "Add Google Meet video conferencing" to auto-generate a meeting link.' },
                { step: 6, title: 'Add Location or Description', desc: 'Include a physical location or add agenda notes in the Description field.' },
                { step: 7, title: 'Invite Participants', desc: 'In "Guests", enter colleagues\' email addresses. Google Calendar checks their availability.' },
                { step: 8, title: 'Set Notifications', desc: 'Add email or pop-up reminders (e.g., 10 minutes before, 1 day before).' },
                { step: 9, title: 'Save and Send Invites', desc: 'Click "Save". You\'ll be asked to send email invitations to all guests.' }
              ]
            },
            {
              title: 'Recurring Events',
              type: 'text',
              content: 'For events that happen regularly (weekly team standups, monthly reviews), use recurring events. When creating an event, click "Does not repeat" and choose from: Daily, Weekly, Monthly, Annually, or set a custom pattern. You can also modify a single occurrence without affecting the whole series.'
            },
            {
              title: 'Best Practices for Professional Scheduling',
              type: 'bullets',
              items: [
                'Use clear event titles that include the purpose and project name',
                'Always add an agenda in the event description',
                'Book meetings for the shortest time needed (avoid defaulting to 1 hour)',
                'Use "Find a time" to check availability before sending invites',
                'Add a meeting link even for in-person meetings (for late-joiners)',
                'Block deep work time on your calendar to protect focus hours',
                'Respond to all meeting invitations promptly (Accept/Decline/Maybe)'
              ]
            }
          ]
        },
        {
          id: 'l1-3',
          moduleId: 'module1',
          order: 3,
          title: 'Gmail — Professional Communication',
          duration: '25 min',
          icon: 'bi-envelope',
          videoTitle: 'Writing Emails with AI',
          videoId: 'AGlJf9E1ZVQ',
          videoLinks: [
            { title: 'Writing Emails with AI', url: 'https://www.youtube.com/watch?v=AGlJf9E1ZVQ' },
            { title: 'Formatting Text in Gmail', url: 'https://www.youtube.com/watch?v=2e1WcW9dK1Y' },
            { title: 'Using Emojis in Emails', url: 'https://www.youtube.com/watch?v=1nlkM2o6q4k' },
            { title: 'CC vs BCC in Gmail', url: 'https://www.youtube.com/watch?v=Vv1p6s6kzDU' }
          ],
          objectives: [
            'Write professional emails following correct structure',
            'Use CC, BCC, and Reply All appropriately',
            'Set up an email signature',
            'Organize inbox with labels and filters'
          ],
          sections: [
            {
              title: 'The Anatomy of a Professional Email',
              type: 'text',
              content: 'A professional email has six key components: a clear subject line, appropriate greeting, concise body, call to action, professional closing, and a complete signature. Each component serves a specific purpose in communicating effectively in a business environment.'
            },
            {
              title: 'Email Structure Guide',
              type: 'cards',
              items: [
                { icon: 'bi-tag', title: 'Subject Line', desc: 'Be specific and descriptive. Example: "Meeting Request: Project Kickoff – April 5 at 10AM"', color: '#1a73e8' },
                { icon: 'bi-person', title: 'Greeting', desc: 'Use "Dear Mr./Ms. [Last Name]," for formal, or "Hi [First Name]," for colleagues.', color: '#34a853' },
                { icon: 'bi-chat-text', title: 'Body', desc: 'State your purpose in the first sentence. Keep it concise — use bullet points for multiple items.', color: '#4285f4' },
                { icon: 'bi-arrow-return-right', title: 'Call to Action', desc: 'Clearly state what you need: "Please confirm by Friday" or "Let me know if you have questions."', color: '#fbbc04' },
                { icon: 'bi-hand-wave', title: 'Closing', desc: 'Use: "Best regards," "Sincerely," or "Thank you," followed by your name.', color: '#ea4335' },
                { icon: 'bi-card-text', title: 'Signature', desc: 'Include your name, job title, company, phone number, and email.', color: '#00897b' }
              ]
            },
            {
              title: 'CC vs BCC — When to Use Each',
              type: 'table',
              headers: ['Feature', 'TO', 'CC (Carbon Copy)', 'BCC (Blind Carbon Copy)'],
              rows: [
                ['Purpose', 'Primary recipient who must act', 'Keep someone informed (FYI)', 'Hidden copy — recipients can\'t see each other'],
                ['Use Case', 'Direct colleague or client', 'Your manager for visibility', 'newsletters, external bulk emails'],
                ['Privacy', 'All see this person', 'All see CC recipients', 'Hidden from all other recipients'],
                ['Example', 'Client requesting a report', 'Manager on a client email', 'Announcing news to 100 clients']
              ]
            },
            {
              title: 'Professional Email Examples',
              type: 'examples',
              items: [
                {
                  label: 'Meeting Request',
                  subject: 'Meeting Request: Budget Review – March 20 at 2 PM',
                  body: 'Dear Ms. Santos,\n\nI hope this message finds you well. I would like to schedule a meeting to discuss the Q1 budget review. Could you please confirm your availability on March 20 at 2 PM?\n\nAgenda:\n• Review Q1 actuals vs. forecast\n• Discuss Q2 planning\n• Assign action items\n\nI have added a Google Meet link for those joining remotely. Please let me know if you need to reschedule.\n\nBest regards,\nJuan Dela Cruz\nFinance Analyst | Acme Corp\njuan.delacruz@acme.com | +63 912 345 6789'
                }
              ]
            },
            {
              title: 'Gmail Productivity Features',
              type: 'bullets',
              items: [
                'Labels: Color-coded tags to categorize emails (like folders)',
                'Filters: Automatically label, archive, or forward emails matching rules',
                'Signature: Set up an auto-added signature via Settings → General → Signature',
                'Templates (Canned Responses): Save and reuse common email templates',
                'Schedule Send: Send emails at the best time (right-click Send button)',
                'Undo Send: Enable in Settings — gives you 5–30 seconds to cancel a sent email',
                'Priority Inbox: Gmail AI separates important emails from the rest',
                'Smart Compose: AI-powered suggestions as you type'
              ]
            },
            {
              title: 'Setting Up Your Email Signature',
              type: 'steps',
              steps: [
                { step: 1, title: 'Open Gmail Settings', desc: 'Click the gear icon (⚙) in the top-right and select "See all settings".' },
                { step: 2, title: 'Go to General Tab', desc: 'Scroll down to the "Signature" section.' },
                { step: 3, title: 'Create New Signature', desc: 'Click "+ Create new" and give your signature a name (e.g., "Work Signature").' },
                { step: 4, title: 'Write Your Signature', desc: 'Add your name, title, company, phone, and email. Use the toolbar to format text.' },
                { step: 5, title: 'Set as Default', desc: 'Under "Signature defaults", set it for new emails and replies/forwards.' },
                { step: 6, title: 'Save Changes', desc: 'Scroll to the bottom and click "Save Changes".' }
              ]
            }
          ]
        },
        {
          id: 'l1-4',
          moduleId: 'module1',
          order: 4,
          title: 'Customer Care Basics',
          duration: '18 min',
          icon: 'bi-headset',
          videoTitle: 'Professional Customer Service Skills',
          videoId: 'B8QOKqJWoaE',
          objectives: [
            'Apply professional tone in customer communication',
            'Use email templates for common customer scenarios',
            'Handle complaints professionally and de-escalate',
            'Leverage Google tools to improve customer support workflow'
          ],
          sections: [
            {
              title: 'What is Customer Care?',
              type: 'text',
              content: 'Customer care is the practice of providing support and assistance to customers before, during, and after a purchase or service interaction. In digital workplaces, this is primarily done via email, chat, and video calls. Excellent customer care builds trust, retains clients, and drives business growth. Using Google Workspace tools, you can manage customer communications professionally and efficiently.'
            },
            {
              title: 'The 5 Pillars of Professional Customer Communication',
              type: 'cards',
              items: [
                { icon: 'bi-clock', title: 'Responsiveness', desc: 'Acknowledge every inquiry within 24 hours, even if the full answer takes longer.', color: '#1a73e8' },
                { icon: 'bi-emoji-smile', title: 'Positive Tone', desc: 'Use empathetic, positive language. Replace "I don\'t know" with "Let me find out for you."', color: '#34a853' },
                { icon: 'bi-check2-circle', title: 'Clarity', desc: 'Be clear and concise. Avoid jargon. Use bullet points for steps or instructions.', color: '#4285f4' },
                { icon: 'bi-shield-check', title: 'Ownership', desc: 'Take responsibility. Never blame the customer or other departments.', color: '#fbbc04' },
                { icon: 'bi-arrow-repeat', title: 'Follow-Up', desc: 'Always follow up to confirm the issue is resolved and the customer is satisfied.', color: '#ea4335' }
              ]
            },
            {
              title: 'Customer Email Templates',
              type: 'examples',
              items: [
                {
                  label: 'Acknowledging a Customer Issue',
                  subject: 'Re: Your Concern – Case #12345',
                  body: 'Dear [Customer Name],\n\nThank you for reaching out to us. I understand your concern regarding [describe issue], and I sincerely apologize for the inconvenience this has caused.\n\nI am currently investigating this matter and will provide you with a full update within 24 hours.\n\nIf you need immediate assistance, please do not hesitate to call us at [phone number].\n\nBest regards,\n[Your Name]\nCustomer Support Specialist'
                },
                {
                  label: 'Issue Resolved',
                  subject: 'Resolution: Your Case #12345 Has Been Resolved',
                  body: 'Dear [Customer Name],\n\nI am happy to inform you that your concern has been resolved. Here is a summary of what was done:\n\n• [Action taken 1]\n• [Action taken 2]\n\nPlease do not hesitate to contact us if you experience any further issues. We value your business and appreciate your patience.\n\nBest regards,\n[Your Name]'
                }
              ]
            },
            {
              title: 'Using Google Tools for Customer Support',
              type: 'bullets',
              items: [
                'Gmail Templates: Save common responses as templates (Enable in Settings → Advanced)',
                'Gmail Labels: Tag emails by "Urgent", "Pending", "Resolved" for easy tracking',
                'Google Sheets: Maintain a customer issue tracker with status and resolution dates',
                'Google Calendar: Schedule follow-up reminders for pending customer cases',
                'Google Drive: Store customer documents, contracts, and records securely',
                'Google Meet: Offer video call support for complex issues that need screen sharing'
              ]
            },
            {
              title: 'Handle Difficult Situations',
              type: 'steps',
              steps: [
                { step: 1, title: 'Acknowledge & Empathize', desc: 'Start by acknowledging the customer\'s frustration: "I completely understand why this is frustrating."' },
                { step: 2, title: 'Apologize Sincerely', desc: 'Offer a genuine apology without making excuses: "I\'m truly sorry for the inconvenience."' },
                { step: 3, title: 'Clarify the Issue', desc: 'Ask one clarifying question to ensure you understand: "Could you please help me understand..."' },
                { step: 4, title: 'Provide a Solution', desc: 'Offer a clear, concrete resolution or the next steps you will take.' },
                { step: 5, title: 'Set Expectations', desc: 'Give a specific timeline: "You will receive a response by [date/time]."' },
                { step: 6, title: 'Follow Up', desc: 'After resolving, send a follow-up email to confirm satisfaction.' }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'module2',
      day: 2,
      title: 'Documents & Data',
      description: 'Create professional documents, master spreadsheets, and collaborate in real time with Google Docs and Sheets.',
      icon: 'bi-file-earmark-spreadsheet',
      color: '#34a853',
      badge: 'Day 2',
      lessons: [
        {
          id: 'l2-1',
          moduleId: 'module2',
          order: 1,
          title: 'Google Docs — Introduction & Formatting',
          duration: '20 min',
          icon: 'bi-file-earmark-text',
          videoTitle: 'Google Docs Getting Started',
          videoId: 'PtGqZ3n3xKs',
          videoLinks: [
            { title: 'Google Docs Getting Started', url: 'https://www.youtube.com/watch?v=PtGqZ3n3xKs' },
            { title: 'Google Docs Formatting', url: 'https://www.youtube.com/watch?v=3g9rY3m4W5M' },
            { title: 'Visual Hierarchy in Documents', url: 'https://www.youtube.com/watch?v=GxmfcnU3feo' }
          ],
          objectives: [
            'Create, format, and structure a Google Doc',
            'Use headings, styles, and paragraph formatting',
            'Insert tables, images, and links',
            'Use spelling and grammar check tools'
          ],
          sections: [
            {
              title: 'What is Google Docs?',
              type: 'text',
              content: 'Google Docs is a free, web-based word processor that allows you to create, edit, and share documents online. Unlike Microsoft Word, Google Docs requires no software installation and saves your work automatically every few seconds to Google Drive. It supports real-time collaboration, meaning multiple people can write and edit the same document simultaneously.'
            },
            {
              title: 'Creating Your First Document',
              type: 'steps',
              steps: [
                { step: 1, title: 'Access Google Docs', desc: 'Go to docs.google.com or click "Docs" in the Google app launcher.' },
                { step: 2, title: 'Create New Document', desc: 'Click the "+" button (Blank) to start, or choose a template from the gallery.' },
                { step: 3, title: 'Name Your Document', desc: 'Click "Untitled document" at the top and type a clear, descriptive name.' },
                { step: 4, title: 'Set Page Layout', desc: 'Go to File → Page setup to configure size, orientation, and margins.' },
                { step: 5, title: 'Start Writing', desc: 'Type your content. The document auto-saves to Google Drive every few seconds.' }
              ]
            },
            {
              title: 'Formatting Essentials',
              type: 'table',
              headers: ['Action', 'Shortcut (Windows)', 'Mac Shortcut'],
              rows: [
                ['Bold', 'Ctrl + B', '⌘ + B'],
                ['Italic', 'Ctrl + I', '⌘ + I'],
                ['Underline', 'Ctrl + U', '⌘ + U'],
                ['Heading 1', 'Ctrl + Alt + 1', '⌘ + Option + 1'],
                ['Heading 2', 'Ctrl + Alt + 2', '⌘ + Option + 2'],
                ['Bullet List', 'Ctrl + Shift + 8', '⌘ + Shift + 8'],
                ['Numbered List', 'Ctrl + Shift + 7', '⌘ + Shift + 7'],
                ['Undo', 'Ctrl + Z', '⌘ + Z'],
                ['Find & Replace', 'Ctrl + H', '⌘ + H']
              ]
            },
            {
              title: 'Using Heading Styles for Structure',
              type: 'text',
              content: 'Proper document structure makes content easier to navigate and read. Use the "Styles" dropdown (Normal text, Heading 1, Heading 2, etc.) to apply consistent formatting. Heading 1 for main sections, Heading 2 for subsections, Heading 3 for sub-subsections. This also enables the automatic Table of Contents (Insert → Table of Contents).'
            },
            {
              title: 'Professional Formatting Tips',
              type: 'bullets',
              items: [
                'Use Heading styles (not just bold/enlarged) for document structure',
                'Set consistent line spacing: Format → Line & Paragraph Spacing → 1.15 or 1.5',
                'Add page numbers: Insert → Headers & Footers → Page number',
                'Create a clickable Table of Contents: Insert → Table of Contents',
                'Add horizontal rules: Insert → Horizontal line — for section separation',
                'Use Format → Clear formatting (Ctrl+\\) to remove inconsistent styles',
                'Check grammar: Tools → Spelling and grammar → (runs automatically with squiggles)'
              ]
            },
            {
              title: 'Inserting Tables and Images',
              type: 'steps',
              steps: [
                { step: 1, title: 'Insert a Table', desc: 'Go to Insert → Table, then drag to select the number of rows and columns needed.' },
                { step: 2, title: 'Format the Table', desc: 'Right-click cells to merge, insert rows, or change background color.' },
                { step: 3, title: 'Insert an Image', desc: 'Go to Insert → Image → Upload from computer (or insert from Drive/URL).' },
                { step: 4, title: 'Wrap Text Around Image', desc: 'Click the image and select a text wrapping option from the toolbar.' },
                { step: 5, title: 'Insert a Link', desc: 'Select text, press Ctrl+K, and enter a URL or search for a document.' }
              ]
            }
          ]
        },
        {
          id: 'l2-2',
          moduleId: 'module2',
          order: 2,
          title: 'Google Docs — Collaboration',
          duration: '15 min',
          icon: 'bi-people',
          videoTitle: 'Commenting in Google Docs',
          videoId: 'Jg9bqYz5h3E',
          videoLinks: [
            { title: 'Commenting in Google Docs', url: 'https://www.youtube.com/watch?v=Jg9bqYz5h3E' }
          ],
          objectives: [
            'Share documents with specific permissions',
            'Use comments and the Suggesting mode',
            'View version history (revision tracking)',
            'Use the @-mention feature to tag people'
          ],
          sections: [
            {
              title: 'Sharing a Google Doc',
              type: 'steps',
              steps: [
                { step: 1, title: 'Click "Share" Button', desc: 'Find the blue "Share" button in the top-right corner of the document.' },
                { step: 2, title: 'Add People', desc: 'Enter email addresses in the "Add people and groups" field.' },
                { step: 3, title: 'Set Permission Level', desc: 'Choose: Viewer (read-only), Commenter (add comments only), or Editor (full edit access).' },
                { step: 4, title: 'Notify People', desc: 'Check "Notify people" to send an email invitation with a direct link.' },
                { step: 5, title: 'Or Share via Link', desc: 'Click "Copy link" and change access to "Anyone with the link" for broader sharing.' }
              ]
            },
            {
              title: 'Permission Levels Explained',
              type: 'table',
              headers: ['Permission', 'Can View', 'Can Comment', 'Can Edit', 'Can Share'],
              rows: [
                ['Viewer', '✅', '❌', '❌', '❌'],
                ['Commenter', '✅', '✅', '❌', '❌'],
                ['Editor', '✅', '✅', '✅', '✅ (if allowed)'],
                ['Owner', '✅', '✅', '✅', '✅']
              ]
            },
            {
              title: 'Comments and Suggestions',
              type: 'bullets',
              items: [
                'Add a comment: Select text → Right-click → "Comment" (or Ctrl+Alt+M)',
                'Tag a person: Type @ followed by their name in a comment to notify them',
                'Resolve comments: Click "Resolve" when the issue is addressed',
                'Suggestion mode: View → Mode → Suggesting (like Track Changes in Word)',
                'In Suggesting mode, your edits appear highlighted for the owner to accept or reject',
                'Accept all suggestions: Tools → Review suggested edits → Accept all',
                'Use suggestions for professional document review workflows'
              ]
            },
            {
              title: 'Version History',
              type: 'text',
              content: 'Google Docs automatically saves every version of your document. To access version history, go to File → Version history → See version history (or press Ctrl+Alt+Shift+H). You can see who made each change, when it was made, and restore any previous version. You can also name important versions: File → Version history → Name current version.'
            },
            {
              title: 'Real-Time Collaboration Tips',
              type: 'bullets',
              items: [
                'See who\'s viewing the document via colored cursor icons at the top',
                'Use the chat panel (View → Show chat) to communicate while editing',
                'Leave detailed comments rather than making silent edits on others\' work',
                'Use @mentions in comments to assign specific tasks to team members',
                'Use "Suggesting" mode when reviewing others\' documents — never edit without consent',
                'Set a deadline comment: "@John please respond by Friday" for accountability',
                'Download as PDF or Word when sharing with people outside Google Workspace'
              ]
            }
          ]
        },
        {
          id: 'l2-3',
          moduleId: 'module2',
          order: 3,
          title: 'Google Sheets — Introduction',
          duration: '20 min',
          icon: 'bi-table',
          videoTitle: 'Google Sheets Getting Started',
          videoId: 'RDMN1n3r0iQ',
          videoLinks: [
            { title: 'Google Sheets Getting Started', url: 'https://www.youtube.com/watch?v=RDMN1n3r0iQ' }
          ],
          objectives: [
            'Navigate the Google Sheets interface',
            'Enter, format, and organize data',
            'Use basic formulas: SUM, AVERAGE, COUNT',
            'Create and format a simple data table'
          ],
          sections: [
            {
              title: 'What is Google Sheets?',
              type: 'text',
              content: 'Google Sheets is a free, web-based spreadsheet application that allows you to organize data in rows and columns, perform calculations, visualize data with charts, and collaborate in real time. It is functionally similar to Microsoft Excel but runs entirely in your browser. Google Sheets is essential for tracking data, generating reports, and doing analysis in professional environments.'
            },
            {
              title: 'The Sheets Interface',
              type: 'bullets',
              items: [
                'Cell: The basic unit — identified by Column letter + Row number (e.g., B3)',
                'Range: A group of cells (e.g., A1:D10)',
                'Sheet Tabs: At the bottom — you can add multiple sheets to one file',
                'Formula Bar: Shows the content or formula of the active cell',
                'Name Box: Top-left — shows the current cell address',
                'Menu Bar: File, Edit, View, Insert, Format, Data, Tools, Extensions, Help',
                'Toolbar: Quick access to formatting, font, alignment, and other tools'
              ]
            },
            {
              title: 'Entering and Formatting Data',
              type: 'steps',
              steps: [
                { step: 1, title: 'Click a Cell', desc: 'Click on any cell to select it. The cell reference appears in the Name Box.' },
                { step: 2, title: 'Type Your Data', desc: 'Type text, numbers, or dates. Press Enter to confirm and move down, Tab to move right.' },
                { step: 3, title: 'Format Numbers', desc: 'Select cells → Format → Number to choose Currency, Date, Percentage, etc.' },
                { step: 4, title: 'Adjust Column Width', desc: 'Double-click the column border in the header row to auto-fit, or drag to resize.' },
                { step: 5, title: 'Freeze Header Row', desc: 'View → Freeze → 1 row — keeps your header visible while scrolling.' },
                { step: 6, title: 'Apply Alternating Colors', desc: 'Select your data → Format → Alternating colors for a professional table look.' }
              ]
            },
            {
              title: 'Basic Formulas',
              type: 'table',
              headers: ['Formula', 'Example', 'What It Does'],
              rows: [
                ['=SUM()', '=SUM(B2:B10)', 'Adds all numbers in the range'],
                ['=AVERAGE()', '=AVERAGE(B2:B10)', 'Calculates the mean of numbers'],
                ['=COUNT()', '=COUNT(B2:B10)', 'Counts cells that contain numbers'],
                ['=COUNTA()', '=COUNTA(A2:A10)', 'Counts non-empty cells (any data type)'],
                ['=MIN()', '=MIN(B2:B10)', 'Finds the smallest value'],
                ['=MAX()', '=MAX(B2:B10)', 'Finds the largest value'],
                ['=IF()', '=IF(B2>100,"High","Low")', 'Returns different values based on condition']
              ]
            },
            {
              title: 'Data Entry Best Practices',
              type: 'bullets',
              items: [
                'Always create a header row with clear column names',
                'Use consistent formats — all dates in the same format, all currencies with $ or ₱',
                'Avoid merging cells in data tables (it breaks sorting and formulas)',
                'Use Data Validation (Data → Data validation) to create dropdown lists',
                'Freeze the header row (View → Freeze → 1 row) before scrolling large datasets',
                'Name your columns clearly: "Order Date" not "Date" or "D"',
                'Use Ctrl+End to navigate to the last data cell in your sheet'
              ]
            }
          ]
        },
        {
          id: 'l2-4',
          moduleId: 'module2',
          order: 4,
          title: 'Google Sheets — Functions & Analysis',
          duration: '25 min',
          icon: 'bi-calculator',
          videoTitle: 'Google Sheets Functions Deep Dive',
          videoId: 'oFExdJmYzDk',
          objectives: [
            'Use VLOOKUP to look up values in a table',
            'Apply conditional formatting for visual data analysis',
            'Create a basic chart from data',
            'Filter and sort data effectively'
          ],
          sections: [
            {
              title: 'VLOOKUP — Look Up Values Across Tables',
              type: 'text',
              content: 'VLOOKUP (Vertical Lookup) searches for a value in the first column of a range and returns a value from another column in the same row. Syntax: =VLOOKUP(search_key, range, index, is_sorted). Example: =VLOOKUP(A2, Products!A:C, 2, FALSE) — looks up the value in A2 in the Products sheet and returns the value from column 2 (column B). The FALSE at the end means exact match.'
            },
            {
              title: 'VLOOKUP Step by Step',
              type: 'steps',
              steps: [
                { step: 1, title: 'Identify the Lookup Key', desc: 'This is the value you\'re searching for. Example: Employee ID in cell A2.' },
                { step: 2, title: 'Set the Search Range', desc: 'The range must have the lookup key in the FIRST column. Example: B2:E100.' },
                { step: 3, title: 'Specify the Column Index', desc: 'Count from the left of the range. Column 1 is the search column; 2 returns the next column.' },
                { step: 4, title: 'Set Exact Match', desc: 'Use FALSE (or 0) for exact match. Use TRUE only for sorted ranges with approximate match.' },
                { step: 5, title: 'Handle Errors', desc: 'Wrap with IFERROR: =IFERROR(VLOOKUP(...),"Not Found") to avoid #N/A errors.' }
              ]
            },
            {
              title: 'Conditional Formatting',
              type: 'text',
              content: 'Conditional formatting automatically highlights cells based on their values. For example, highlight all sales below target in red, or all completed tasks in green. To apply: Select your range → Format → Conditional formatting. Set the rule (e.g., "is less than 100") and choose a color. You can add multiple rules to the same range.'
            },
            {
              title: 'Useful Functions Reference',
              type: 'table',
              headers: ['Function', 'Syntax', 'Purpose'],
              rows: [
                ['VLOOKUP', '=VLOOKUP(key, range, col, FALSE)', 'Look up value in first column of table'],
                ['SUMIF', '=SUMIF(range, criteria, sum_range)', 'Sum values that meet a condition'],
                ['COUNTIF', '=COUNTIF(range, criteria)', 'Count cells that meet a condition'],
                ['IF', '=IF(condition, true_val, false_val)', 'Return different values based on logic'],
                ['CONCATENATE', '=CONCATENATE(A1," ",B1)', 'Join text from multiple cells'],
                ['TEXT', '=TEXT(A1,"MM/DD/YYYY")', 'Format numbers/dates as text'],
                ['IFERROR', '=IFERROR(formula,"Error")', 'Catch and handle formula errors']
              ]
            },
            {
              title: 'Creating a Chart',
              type: 'steps',
              steps: [
                { step: 1, title: 'Select Your Data', desc: 'Highlight the cells including headers that you want to visualize.' },
                { step: 2, title: 'Insert Chart', desc: 'Go to Insert → Chart. A chart is automatically created based on your data.' },
                { step: 3, title: 'Choose Chart Type', desc: 'In the Chart editor sidebar, choose Bar, Line, Pie, Column, etc.' },
                { step: 4, title: 'Customize Appearance', desc: 'Use the "Customize" tab to change colors, labels, fonts, and legends.' },
                { step: 5, title: 'Move the Chart', desc: 'Click the chart and drag it to a new position, or use "Move to own sheet" for a full-page chart.' }
              ]
            },
            {
              title: 'Sorting and Filtering Data',
              type: 'bullets',
              items: [
                'Sort: Data → Sort range → Sort by column A (or Z→A for descending)',
                'Add Filter: Data → Create a filter — adds dropdown arrows to header row',
                'Filter by value: Click filter arrow and uncheck values to hide rows',
                'Filter by condition: "Greater than", "Contains", "Date is after", etc.',
                'Clear filter: Data → Remove filter',
                'Freeze header: View → Freeze → 1 row — so the header is always visible when filtering',
                'Create Filter Views (Data → Filter views) to save different filter presets'
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'module3',
      day: 3,
      title: 'Storage & Troubleshooting',
      description: 'Master Google Drive file management, sharing permissions, and essential internet troubleshooting skills.',
      icon: 'bi-cloud-arrow-up',
      color: '#fbbc04',
      badge: 'Day 3',
      lessons: [
        {
          id: 'l3-1',
          moduleId: 'module3',
          order: 1,
          title: 'Google Drive — Introduction',
          duration: '15 min',
          icon: 'bi-cloud',
          videoTitle: 'Introduction to Google Drive',
          videoId: 'I9sG7s2h9n0',
          videoLinks: [
            { title: 'Introduction to Google Drive', url: 'https://www.youtube.com/watch?v=I9sG7s2h9n0' }
          ],
          objectives: [
            'Understand what Google Drive is and how it works',
            'Upload, download, and manage files',
            'Create and organize folder structures',
            'Search for files effectively'
          ],
          sections: [
            {
              title: 'What is Google Drive?',
              type: 'text',
              content: 'Google Drive is a cloud storage service that allows you to store files online and access them from any device with internet access. It provides 15 GB of free storage shared across Gmail, Drive, and Google Photos. Drive also serves as the home for all Google Docs, Sheets, and Slides files — which don\'t count against your storage quota. In professional environments, Google Drive is used to store documents, presentations, spreadsheets, images, and any other file type.'
            },
            {
              title: 'Drive Storage Overview',
              type: 'cards',
              items: [
                { icon: 'bi-person', title: 'My Drive', desc: 'Your personal storage space. Everything you create or upload here is yours.', color: '#1a73e8' },
                { icon: 'bi-people', title: 'Shared Drives', desc: 'Collaborative spaces for teams. Files belong to the team, not individuals.', color: '#34a853' },
                { icon: 'bi-share', title: 'Shared with Me', desc: 'Files and folders others have shared with you.', color: '#4285f4' },
                { icon: 'bi-star', title: 'Starred', desc: 'Files you\'ve marked with a star for quick access.', color: '#fbbc04' },
                { icon: 'bi-clock-history', title: 'Recent', desc: 'Files you\'ve recently opened or modified.', color: '#ea4335' },
                { icon: 'bi-trash', title: 'Trash', desc: 'Deleted files. Items are permanently deleted after 30 days.', color: '#9e9e9e' }
              ]
            },
            {
              title: 'Uploading Files',
              type: 'steps',
              steps: [
                { step: 1, title: 'Open Google Drive', desc: 'Go to drive.google.com or click Drive in the app launcher.' },
                { step: 2, title: 'Upload Files', desc: 'Click "+ New" → "File upload" and select files from your computer.' },
                { step: 3, title: 'Upload a Folder', desc: 'Click "+ New" → "Folder upload" to upload an entire folder with its structure.' },
                { step: 4, title: 'Drag and Drop', desc: 'Simply drag files from your computer directly into the Drive browser window.' },
                { step: 5, title: 'Check Upload Status', desc: 'A progress bar appears in the bottom-right corner. Wait for "Upload complete".' }
              ]
            },
            {
              title: 'Drive Accepts These File Types',
              type: 'bullets',
              items: [
                'Documents: .doc, .docx, .pdf, .txt, .odt',
                'Spreadsheets: .xls, .xlsx, .csv, .ods',
                'Presentations: .ppt, .pptx, .odp',
                'Images: .jpg, .png, .gif, .svg, .bmp',
                'Videos: .mp4, .avi, .mov, .mkv',
                'Audio: .mp3, .wav, .aac',
                'Code & Others: .zip, .html, .py, .js — most file types are supported'
              ]
            },
            {
              title: 'Searching for Files',
              type: 'text',
              content: 'Google Drive has a powerful search function. Use the search bar at the top to find files by name, type, or content (Drive can search inside documents). For advanced search, click the search options icon (triangle) next to the search bar. You can filter by: file type, owner, date modified, shared with, location, and more. Tip: Type "type:pdf" to find all PDF files instantly.'
            }
          ]
        },
        {
          id: 'l3-2',
          moduleId: 'module3',
          order: 2,
          title: 'File Organization & Sharing Permissions',
          duration: '20 min',
          icon: 'bi-folder2-open',
          videoTitle: 'Create Folders in Google Drive',
          videoId: '7b9g5z4Q2oU',
          videoLinks: [
            { title: 'Create Folders in Google Drive', url: 'https://www.youtube.com/watch?v=7b9g5z4Q2oU' },
            { title: 'Move Files in Google Drive', url: 'https://www.youtube.com/watch?v=q1b6f6o3v9Q' },
            { title: 'Sharing Files in Google Drive', url: 'https://www.youtube.com/watch?v=0v5E1H0x7mA' }
          ],
          objectives: [
            'Create an effective folder structure for team use',
            'Set and manage file sharing permissions',
            'Use Shared Drives for team collaboration',
            'Understand link sharing vs. individual sharing'
          ],
          sections: [
            {
              title: 'Building a Folder Structure',
              type: 'text',
              content: 'A good folder structure saves time and prevents files from getting lost. Think of it as organizing a physical filing cabinet — main categories at the top level, with more specific subfolders underneath. The key is consistency: once you establish a structure, stick to it and make sure the whole team follows it.'
            },
            {
              title: 'Recommended Folder Structure',
              type: 'steps',
              steps: [
                { step: 1, title: 'Create Year/Department Folder', desc: 'Top level: "2026 – Marketing Dept" or "Operations Team"' },
                { step: 2, title: 'Create Category Subfolders', desc: 'Inside: "Projects", "Reports", "Resources", "Meetings", "Archive"' },
                { step: 3, title: 'Create Project Subfolders', desc: 'Inside Projects: one folder per project, named with date + project name.' },
                { step: 4, title: 'Use Consistent Naming', desc: 'File names: YYYY-MM-DD_Description_Version (e.g., 2026-03-15_Budget-Report_v2)' },
                { step: 5, title: 'Archive Old Files', desc: 'Move completed projects to an Archive folder — keeps active folders clean.' }
              ]
            },
            {
              title: 'Sharing Files — Permission Levels',
              type: 'table',
              headers: ['Permission', 'Can View', 'Can Comment', 'Can Edit', 'Can Delete/Move'],
              rows: [
                ['Viewer', '✅', '❌', '❌', '❌'],
                ['Commenter', '✅', '✅', '❌', '❌'],
                ['Editor', '✅', '✅', '✅', '❌ (if not owner)'],
                ['Owner', '✅', '✅', '✅', '✅']
              ]
            },
            {
              title: 'Sharing a File or Folder',
              type: 'steps',
              steps: [
                { step: 1, title: 'Right-click the File', desc: 'Right-click any file or folder in Drive and select "Share".' },
                { step: 2, title: 'Add People', desc: 'Type email addresses in the field and set their permission (Viewer/Commenter/Editor).' },
                { step: 3, title: 'Or Share via Link', desc: 'Click "Copy link" and choose the access level: Restricted, Anyone with the link.' },
                { step: 4, title: 'Send Notification', desc: 'Add an optional message and click "Send" — they\'ll receive an email with the link.' },
                { step: 5, title: 'Manage Access Later', desc: 'Re-open Share dialog to change permissions, remove people, or transfer ownership.' }
              ]
            },
            {
              title: 'Link Sharing Best Practices',
              type: 'bullets',
              items: [
                'Use "Restricted" (only specific people) for sensitive or confidential files',
                'Use "Anyone with the link – Viewer" for public resources or reference materials',
                'Never set sensitive files to "Anyone with the link – Editor"',
                'Regularly audit file permissions: right-click → Share → "See who has access"',
                'Set expiration dates on shared links for temporary access (Workspace admin feature)',
                'Use Shared Drives for team files — ownership doesn\'t depend on one person\'s account',
                'When an employee leaves, transfer their file ownership before removing the account'
              ]
            }
          ]
        },
        {
          id: 'l3-3',
          moduleId: 'module3',
          order: 3,
          title: 'Internet Troubleshooting',
          duration: '20 min',
          icon: 'bi-wifi',
          videoTitle: 'Basic Internet Troubleshooting',
          videoId: 'hPNJAjkrZeQ',
          objectives: [
            'Identify and resolve common internet connectivity issues',
            'Follow a systematic troubleshooting approach',
            'Distinguish hardware vs. software connectivity problems',
            'Know when to escalate to IT support'
          ],
          sections: [
            {
              title: 'The Troubleshooting Mindset',
              type: 'text',
              content: 'Effective troubleshooting follows a logical, systematic process. Rather than randomly trying fixes, start from the most basic checks (is it plugged in?) and work your way up to more complex diagnostics. The goal is to isolate the problem — determine whether it\'s hardware, software, local network, or internet service provider (ISP) related.'
            },
            {
              title: 'Common Internet Problems & Quick Fixes',
              type: 'cards',
              items: [
                { icon: 'bi-wifi-off', title: 'No Internet Connection', desc: 'Check network adapter, restart router/modem, verify cable connections.', color: '#ea4335' },
                { icon: 'bi-hourglass-split', title: 'Slow Internet', desc: 'Run a speed test, limit connected devices, clear browser cache, contact ISP.', color: '#fbbc04' },
                { icon: 'bi-browser-safari', title: 'Website Not Loading', desc: 'Try a different browser, clear cache/cookies, flush DNS, check firewall.', color: '#1a73e8' },
                { icon: 'bi-exclamation-triangle', title: 'Intermittent Drops', desc: 'Check for signal interference, update network drivers, inspect cables.', color: '#ff7043' },
                { icon: 'bi-lock', title: 'Can\'t Access Specific Site', desc: 'Site may be blocked by firewall, or check DNS settings. Try using 8.8.8.8.', color: '#9c27b0' },
                { icon: 'bi-reception-0', title: 'No WiFi Signal', desc: 'Move closer to router, check if WiFi adapter is enabled, forget and reconnect.', color: '#607d8b' }
              ]
            },
            {
              title: 'Step-by-Step Troubleshooting Process',
              type: 'steps',
              steps: [
                { step: 1, title: 'Check Physical Connections', desc: 'Ensure Ethernet cables are plugged in, WiFi is enabled, and the router is powered on (check lights).' },
                { step: 2, title: 'Restart Your Device', desc: 'Restart computer/phone. This clears most temporary software glitches.' },
                { step: 3, title: 'Restart the Router/Modem', desc: 'Unplug the power cable, wait 30 seconds, plug back in. Wait 2 minutes for reconnection.' },
                { step: 4, title: 'Test with Another Device', desc: 'Check if other devices can connect. If yes, the problem is with your specific device.' },
                { step: 5, title: 'Run Ping Test', desc: 'Open Command Prompt and run: ping 8.8.8.8 — if replies are received, the internet is working.' },
                { step: 6, title: 'Flush DNS', desc: 'Open Command Prompt as Admin and run: ipconfig /flushdns — clears cached DNS records.' },
                { step: 7, title: 'Check Browser Issues', desc: 'Clear browser cache and cookies: Ctrl+Shift+Delete → Select All → Clear data.' },
                { step: 8, title: 'Update Network Drivers', desc: 'Device Manager → Network Adapters → Update driver. Install pending Windows updates.' },
                { step: 9, title: 'Contact ISP', desc: 'If all above steps fail, the issue is with your ISP. Call support and provide your troubleshooting steps.' }
              ]
            },
            {
              title: 'Network Commands Quick Reference',
              type: 'table',
              headers: ['Command', 'What It Does', 'Example'],
              rows: [
                ['ipconfig', 'Displays IP address, subnet, gateway', 'ipconfig /all'],
                ['ping', 'Tests connectivity to a host', 'ping 8.8.8.8'],
                ['tracert', 'Shows the path to a destination', 'tracert google.com'],
                ['nslookup', 'Queries DNS for a domain name', 'nslookup google.com'],
                ['netstat', 'Shows active network connections', 'netstat -an'],
                ['ipconfig /flushdns', 'Clears the DNS cache', 'ipconfig /flushdns'],
                ['ipconfig /release', 'Releases DHCP IP address', 'ipconfig /release'],
                ['ipconfig /renew', 'Requests a new IP address', 'ipconfig /renew']
              ]
            }
          ]
        },
        {
          id: 'l3-4',
          moduleId: 'module3',
          order: 4,
          title: 'PING Command & Network Basics',
          duration: '18 min',
          icon: 'bi-terminal',
          videoTitle: 'Understanding PING and Network Diagnostics',
          videoId: 'vJV-GBZ6PeM',
          objectives: [
            'Use the PING command to test network connectivity',
            'Interpret PING results (TTL, round-trip time, packet loss)',
            'Understand IP addresses and subnets at a basic level',
            'Use traceroute to diagnose network hops'
          ],
          sections: [
            {
              title: 'What is the PING Command?',
              type: 'text',
              content: 'PING (Packet Internet Groper) is a network utility that tests whether a specific host (computer or server) is reachable across an IP network. It sends small data packets (ICMP Echo Requests) to the target and measures the round-trip time for the response. PING is one of the most fundamental and widely used network diagnostic tools available on every major operating system.'
            },
            {
              title: 'How to Run PING',
              type: 'steps',
              steps: [
                { step: 1, title: 'Open Command Prompt', desc: 'Press Windows + R, type "cmd", press Enter. Or search "Command Prompt" in the Start menu.' },
                { step: 2, title: 'Type the PING Command', desc: 'Type: ping 8.8.8.8 (Google\'s DNS server) and press Enter.' },
                { step: 3, title: 'Read the Results', desc: 'You\'ll see 4 lines of results with round-trip times. Then a summary.' },
                { step: 4, title: 'Ping by Domain Name', desc: 'Type: ping google.com — the system resolves the name to an IP first.' },
                { step: 5, title: 'Continuous PING', desc: 'Type: ping -t 8.8.8.8 to ping continuously. Press Ctrl+C to stop.' },
                { step: 6, title: 'Check the Summary', desc: 'At the end you see: Sent, Received, Lost packets — and min/max/average times.' }
              ]
            },
            {
              title: 'Reading PING Results',
              type: 'text',
              content: 'A typical PING result looks like:\n\nReply from 8.8.8.8: bytes=32 time=14ms TTL=116\n\nHere:\n• "Reply from 8.8.8.8" — the server responded (connection is working)\n• "bytes=32" — the size of the packet sent\n• "time=14ms" — round-trip time in milliseconds (lower is better)\n• "TTL=116" — Time To Live: a counter that decrements at each router hop\n\nIf you see "Request timed out" — the host is unreachable or blocking ICMP packets.'
            },
            {
              title: 'Interpreting PING Response Times',
              type: 'table',
              headers: ['Response Time', 'Quality', 'Typical Cause'],
              rows: [
                ['< 20ms', 'Excellent', 'Same city / nearby server'],
                ['20–50ms', 'Good', 'Same country / fast ISP'],
                ['50–100ms', 'Acceptable', 'International connection'],
                ['100–200ms', 'Noticeable delay', 'Far server or congested network'],
                ['> 200ms', 'Poor / gaming lag', 'Very distant server or weak signal'],
                ['Request timed out', 'No response', 'Host unreachable, firewall blocking, or no internet']
              ]
            },
            {
              title: 'Network Basics',
              type: 'bullets',
              items: [
                'IP Address: A unique number identifying a device on a network (e.g., 192.168.1.100)',
                'IPv4: The current standard — 4 numbers 0-255 separated by dots',
                'Private IP: Used inside your local network (192.168.x.x, 10.x.x.x)',
                'Public IP: Your router\'s address on the internet — assigned by your ISP',
                'Subnet Mask: Defines the size of your local network (e.g., 255.255.255.0)',
                'Default Gateway: Your router\'s IP — the "door" to the internet (e.g., 192.168.1.1)',
                'DNS (Domain Name System): Translates domain names to IP addresses',
                'DHCP: Protocol that automatically assigns IP addresses to devices on the network'
              ]
            },
            {
              title: 'Using TRACERT to Diagnose Routes',
              type: 'text',
              content: 'TRACERT (Trace Route) shows the path your data takes from your computer to a destination server, listing each router hop along the way. Run: tracert google.com. Each line shows a router/gateway your data passed through and the time it took. If one hop shows very high latency or "*" (timeout), that\'s where the problem is. This helps you identify whether the issue is:\n• On your local network (first few hops)\n• At your ISP (middle hops)\n• At the destination server (last hop)'
            }
          ]
        }
      ]
    }
  ],

  // ── QUIZZES ──────────────────────────────────────────────
  quizzes: {
    module1: [
      { id: 'q1-1', question: 'What is the main purpose of Google Calendar?', options: ['Editing documents', 'Scheduling events and managing time', 'Sending emails', 'Creating spreadsheets'], answer: 1 },
      { id: 'q1-2', question: 'Which Google Workspace tool is used for professional email communication?', options: ['Google Docs', 'Google Sheets', 'Gmail', 'Google Drive'], answer: 2 },
      { id: 'q1-3', question: 'What does BCC stand for in email?', options: ['Basic Carbon Copy', 'Blind Carbon Copy', 'Business Contact Copy', 'Broadcast Copy Center'], answer: 1 },
      { id: 'q1-4', question: 'In Google Calendar, which feature helps you see when colleagues are available for a meeting?', options: ['Event Colors', 'Video Conference', 'Find a time / Free-Busy view', 'Time Zone settings'], answer: 2 },
      { id: 'q1-5', question: 'Which of the following is the most professional email subject line?', options: ['Hey!', 'Meeting Request: Q1 Review – March 15 at 2PM', 'URGENT!!!', 'FYI'], answer: 1 },
      { id: 'q1-6', question: 'Google Workspace was formerly known as:', options: ['Google Apps for Work', 'G Suite', 'Google Office', 'Both A and B (Google Apps and G Suite)'], answer: 3 },
      { id: 'q1-7', question: 'What is the correct formal salutation when addressing someone via email?', options: ['"Yo"', '"Hey there"', '"Dear Mr./Ms. [Last Name],"', '"What\'s up"'], answer: 2 },
      { id: 'q1-8', question: 'When should you use CC in an email?', options: ['When you want to hide recipients from each other', 'To keep someone informed who is not the primary recipient', 'To encrypt the email', 'When forwarding to multiple departments'], answer: 1 },
      { id: 'q1-9', question: 'Which Gmail feature allows you to save and reuse common email responses?', options: ['Smart Compose', 'Priority Inbox', 'Templates (Canned Responses)', 'Schedule Send'], answer: 2 },
      { id: 'q1-10', question: 'In customer care, what is the FIRST step when a customer reports a problem?', options: ['Immediately provide a solution', 'Tell them to wait', 'Acknowledge and empathize with their concern', 'Transfer to another department'], answer: 2 }
    ],
    module2: [
      { id: 'q2-1', question: 'What is the main advantage of Google Docs over traditional word processors?', options: ['Better fonts and templates', 'Real-time collaboration and automatic saving', 'Works only offline', 'Has more formatting options than Microsoft Word'], answer: 1 },
      { id: 'q2-2', question: 'In Google Sheets, which formula calculates the total of a range of numbers?', options: ['=COUNT(A1:A10)', '=AVERAGE(A1:A10)', '=SUM(A1:A10)', '=TOTAL(A1:A10)'], answer: 2 },
      { id: 'q2-3', question: 'In Google Docs, "Suggesting" mode is similar to which Microsoft Word feature?', options: ['Spell Check', 'Track Changes', 'Review Pane', 'Document Inspector'], answer: 1 },
      { id: 'q2-4', question: 'Which function in Google Sheets looks up a value and returns data from a matching row?', options: ['SUMIF', 'COUNTIF', 'VLOOKUP', 'MATCH'], answer: 2 },
      { id: 'q2-5', question: 'How do you access Version History in Google Docs?', options: ['Edit → History', 'File → Version history → See version history', 'View → Revisions', 'Tools → Versions'], answer: 1 },
      { id: 'q2-6', question: 'A cell reference written as $A$1 in Google Sheets is called:', options: ['Relative Reference', 'Mixed Reference', 'Absolute Reference', 'Fixed Reference'], answer: 2 },
      { id: 'q2-7', question: 'What does the AVERAGE function do in Google Sheets?', options: ['Counts cells with numbers', 'Adds all numbers in a range', 'Calculates the arithmetic mean of numbers', 'Finds the middle value when sorted'], answer: 2 },
      { id: 'q2-8', question: 'What is the keyboard shortcut to insert a comment in Google Docs?', options: ['Ctrl+C', 'Ctrl+Alt+M', 'Ctrl+K', 'Ctrl+Shift+C'], answer: 1 },
      { id: 'q2-9', question: 'Which Google Sheets feature automatically highlights cells based on their values?', options: ['Data Validation', 'Conditional Formatting', 'Smart Fill', 'Alternating Colors'], answer: 1 },
      { id: 'q2-10', question: 'What does IFERROR do when wrapped around a formula?', options: ['Prevents the formula from running', 'Returns a custom value instead of showing an error message', 'Corrects errors automatically', 'Shows all possible error types'], answer: 1 }
    ],
    module3: [
      { id: 'q3-1', question: 'What is the primary purpose of Google Drive?', options: ['Sending and receiving emails', 'Creating presentations only', 'Storing and sharing files online in the cloud', 'Video conferencing with colleagues'], answer: 2 },
      { id: 'q3-2', question: 'Which PING command tests connectivity to Google\'s public DNS server?', options: ['ping localhost', 'ping 8.8.8.8', 'ping 0.0.0.0', 'ping router.local'], answer: 1 },
      { id: 'q3-3', question: 'In Google Drive, which permission level allows someone to ONLY view files without editing?', options: ['Editor', 'Owner', 'Commenter', 'Viewer'], answer: 3 },
      { id: 'q3-4', question: 'What does a PING "Request timed out" message indicate?', options: ['Connection is very fast', 'Target is unreachable or blocking ICMP packets', 'DNS is resolving correctly', 'The firewall is disabled'], answer: 1 },
      { id: 'q3-5', question: 'What is the recommended first step when troubleshooting internet connectivity issues?', options: ['Call your ISP immediately', 'Reinstall Windows', 'Check physical connections and restart the router', 'Delete browser history'], answer: 2 },
      { id: 'q3-6', question: 'How do you organize files more effectively in Google Drive?', options: ['Create a folder hierarchy with clear naming conventions', 'Leave all files in My Drive root without folders', 'Delete old files regularly', 'Rename all files to numbers'], answer: 0 },
      { id: 'q3-7', question: 'Which command displays your computer\'s IP address and network configuration on Windows?', options: ['ping', 'ipconfig', 'netstat', 'tracert'], answer: 1 },
      { id: 'q3-8', question: 'In Google Drive, "Shared with me" section shows:', options: ['Files you have created and uploaded', 'Files that others have shared with you', 'Deleted files in the trash', 'Files you have starred or bookmarked'], answer: 1 },
      { id: 'q3-9', question: 'What does TTL stand for in PING command results?', options: ['Time To Load', 'Total Transfer Limit', 'Time To Live', 'Terminal Transfer Level'], answer: 2 },
      { id: 'q3-10', question: 'Which command shows the route your data takes through network routers to reach a destination?', options: ['ping', 'ipconfig', 'netstat', 'tracert'], answer: 3 }
    ]
  },

  // ── RESOURCES ──────────────────────────────────────────────
  resources: [
    {
      id: 'r1',
      category: 'Templates',
      title: 'Professional Email Templates',
      description: 'A collection of ready-to-use Gmail templates for meetings, follow-ups, complaints, and customer care.',
      icon: 'bi-envelope-paper',
      color: '#ea4335',
      type: 'PDF',
      size: '245 KB',
      module: 'Module 1'
    },
    {
      id: 'r2',
      category: 'Checklists',
      title: 'Meeting Planning Checklist',
      description: 'Step-by-step checklist for scheduling and running effective meetings using Google Calendar and Meet.',
      icon: 'bi-check2-all',
      color: '#1a73e8',
      type: 'PDF',
      size: '128 KB',
      module: 'Module 1'
    },
    {
      id: 'r3',
      category: 'Templates',
      title: 'Google Sheets — Budget Tracker Template',
      description: 'Pre-built spreadsheet template with formulas for tracking income, expenses, and monthly budgets.',
      icon: 'bi-table',
      color: '#34a853',
      type: 'XLSX',
      size: '56 KB',
      module: 'Module 2'
    },
    {
      id: 'r4',
      category: 'Templates',
      title: 'Google Docs — Report Template',
      description: 'Professional business report template with pre-formatted headings, table of contents, and styles.',
      icon: 'bi-file-earmark-text',
      color: '#4285f4',
      type: 'DOCX',
      size: '78 KB',
      module: 'Module 2'
    },
    {
      id: 'r5',
      category: 'Guides',
      title: 'Internet Troubleshooting Quick Guide',
      description: 'A printable one-page reference card for common internet issues and their solutions.',
      icon: 'bi-wifi',
      color: '#ff7043',
      type: 'PDF',
      size: '112 KB',
      module: 'Module 3'
    },
    {
      id: 'r6',
      category: 'Guides',
      title: 'Google Drive Organization Best Practices',
      description: 'Recommended folder structures, naming conventions, and sharing permission guidelines.',
      icon: 'bi-folder2-open',
      color: '#fbbc04',
      type: 'PDF',
      size: '189 KB',
      module: 'Module 3'
    },
    {
      id: 'r7',
      category: 'Checklists',
      title: 'Network Commands Reference Sheet',
      description: 'Quick reference for Windows and Mac network diagnostic commands: PING, TRACERT, IPCONFIG, NSLOOKUP.',
      icon: 'bi-terminal',
      color: '#9c27b0',
      type: 'PDF',
      size: '95 KB',
      module: 'Module 3'
    },
    {
      id: 'r8',
      category: 'Guides',
      title: 'Complete Google Workspace Glossary',
      description: 'Definitions of 60+ terms used across all Google Workspace tools and internet networking.',
      icon: 'bi-book',
      color: '#00897b',
      type: 'PDF',
      size: '320 KB',
      module: 'All Modules'
    }
  ]
};

// Helper to get a module by ID
function getModule(moduleId) {
  return GWData.modules.find(m => m.id === moduleId);
}

// Helper to get a lesson
function getLesson(moduleId, lessonId) {
  const module = getModule(moduleId);
  if (!module) return null;
  return module.lessons.find(l => l.id === lessonId);
}

// Helper to get next/previous lesson
function getAdjacentLesson(moduleId, lessonId, direction) {
  const module = getModule(moduleId);
  if (!module) return null;
  const idx = module.lessons.findIndex(l => l.id === lessonId);
  if (direction === 'next') return module.lessons[idx + 1] || null;
  if (direction === 'prev') return module.lessons[idx - 1] || null;
  return null;
}
