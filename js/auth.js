// ============================================================
// auth.js — User authentication with localStorage
// ============================================================

const Auth = {
  GOOGLE_ONLY_AUTH: true,
  STORAGE_KEY: 'gw_user',
  USERS_KEY: 'gw_users',
  GOOGLE_CLIENT_ID_KEY: 'gw_google_client_id',

  // Get all registered users
  getUsers() {
    return JSON.parse(localStorage.getItem(this.USERS_KEY) || '[]');
  },

  // Get current logged-in user
  getUser() {
    return JSON.parse(localStorage.getItem(this.STORAGE_KEY) || 'null');
  },

  // Check if a user is logged in
  isLoggedIn() {
    return !!this.getUser();
  },

  // Register a new user
  register(name, email, password) {
    if (this.GOOGLE_ONLY_AUTH) {
      return { ok: false, msg: 'Password sign-up is disabled. Please use Google Sign-In.' };
    }
    if (!name || name.trim().length < 2) return { ok: false, msg: 'Name must be at least 2 characters.' };
    if (!email || !this.validEmail(email)) return { ok: false, msg: 'Please enter a valid email address.' };
    if (!password || password.length < 6) return { ok: false, msg: 'Password must be at least 6 characters.' };

    const users = this.getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, msg: 'An account with this email already exists.' };
    }

    const user = {
      id: 'u_' + Date.now(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash: this.simpleHash(password),
      joinedAt: new Date().toISOString(),
      avatar: name.trim().charAt(0).toUpperCase()
    };

    users.push(user);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    // Auto-login after register
    const safeUser = { ...user };
    delete safeUser.passwordHash;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(safeUser));
    return { ok: true, user: safeUser };
  },

  // Login
  login(email, password) {
    if (this.GOOGLE_ONLY_AUTH) {
      return { ok: false, msg: 'Password login is disabled. Please continue with Google.' };
    }
    if (!email || !password) return { ok: false, msg: 'Please fill in all fields.' };
    const users = this.getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase().trim());
    if (!user) return { ok: false, msg: 'No account found with this email.' };
    if (user.passwordHash !== this.simpleHash(password)) return { ok: false, msg: 'Incorrect password. Please try again.' };

    const safeUser = { ...user };
    delete safeUser.passwordHash;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(safeUser));
    return { ok: true, user: safeUser };
  },

  // Logout
  logout() {
    localStorage.removeItem(this.STORAGE_KEY);
  },

  // Redirect to login if not authenticated
  requireAuth() {
    if (!this.isLoggedIn()) {
      window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.href);
      return false;
    }
    return true;
  },

  // Redirect away from login/register if already logged in
  redirectIfLoggedIn(target = 'dashboard.html') {
    if (this.isLoggedIn()) {
      window.location.href = target;
    }
  },

  // Simple (non-cryptographic) hash for demo purposes
  // NOTE: In production, NEVER use client-side hashing — use server-side bcrypt with HTTPS.
  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash |= 0;
    }
    return hash.toString(36);
  },

  // Email validation
  validEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  // Read Google OAuth client ID from env override or localStorage.
  // Priority: window.GW_ENV.GOOGLE_CLIENT_ID > window.GW_GOOGLE_CLIENT_ID > localStorage value.
  getGoogleClientId() {
    const envValue = (typeof window !== 'undefined' && window.GW_ENV && window.GW_ENV.GOOGLE_CLIENT_ID) ? String(window.GW_ENV.GOOGLE_CLIENT_ID).trim() : '';
    if (envValue) return envValue;
    const winValue = typeof window !== 'undefined' ? window.GW_GOOGLE_CLIENT_ID : '';
    const fromWindow = typeof winValue === 'string' ? winValue.trim() : '';
    if (fromWindow) return fromWindow;
    return (localStorage.getItem(this.GOOGLE_CLIENT_ID_KEY) || '').trim();
  },

  // Optional helper to persist client ID from the browser console.
  setGoogleClientId(clientId) {
    const value = (clientId || '').trim();
    if (!value) return false;
    localStorage.setItem(this.GOOGLE_CLIENT_ID_KEY, value);
    return true;
  },

  // Decode JWT payload from Google credential response.
  decodeJwtPayload(token) {
    try {
      const parts = (token || '').split('.');
      if (parts.length !== 3) return null;
      const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4);
      const payload = atob(padded);
      return JSON.parse(payload);
    } catch (_) {
      return null;
    }
  },

  // Create or login user from Google credential payload.
  loginWithGoogleCredential(credential) {
    const payload = this.decodeJwtPayload(credential);
    if (!payload || !payload.email) {
      return { ok: false, msg: 'Google sign-in failed. Please try again.' };
    }

    const email = String(payload.email).toLowerCase().trim();
    const name = (payload.name || payload.given_name || email.split('@')[0] || 'User').trim();
    const users = this.getUsers();

    let user = users.find(u => (u.email || '').toLowerCase() === email);
    if (!user) {
      user = {
        id: 'u_' + Date.now(),
        name,
        email,
        passwordHash: null,
        provider: 'google',
        googleSub: payload.sub || null,
        avatar: name.charAt(0).toUpperCase(),
        avatarUrl: payload.picture || '',
        joinedAt: new Date().toISOString()
      };
      users.push(user);
    } else {
      user.name = user.name || name;
      user.provider = user.provider || 'google';
      if (payload.sub) user.googleSub = payload.sub;
      if (payload.picture) user.avatarUrl = payload.picture;
    }

    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    const safeUser = { ...user };
    delete safeUser.passwordHash;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(safeUser));
    return { ok: true, user: safeUser };
  },

  // Render Google sign-in button and wire callback to local auth session.
  // Returns: {ok:boolean, msg?:string}
  initGoogleSignIn(opts = {}) {
    const {
      containerId = 'googleSignInBtn',
      autoPrompt = false,
      onSuccess = null,
      onError = null,
      attempt = 0
    } = opts;

    const clientId = this.getGoogleClientId();
    if (!clientId) {
      return {
        ok: false,
        msg: 'Google sign-in is not configured yet. Set window.GW_ENV.GOOGLE_CLIENT_ID in js/env.local.js (recommended) or call Auth.setGoogleClientId("YOUR_CLIENT_ID").'
      };
    }

    if (!window.google || !window.google.accounts || !window.google.accounts.id) {
      if (attempt >= 10) {
        return { ok: false, msg: 'Google script did not load. Check internet access and try again.' };
      }
      setTimeout(() => {
        this.initGoogleSignIn({ containerId, autoPrompt, onSuccess, onError, attempt: attempt + 1 });
      }, 250);
      return { ok: true };
    }

    const container = document.getElementById(containerId);
    if (!container) {
      return { ok: false, msg: 'Google sign-in container not found on this page.' };
    }

    try {
      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: (response) => {
          const result = this.loginWithGoogleCredential(response && response.credential);
          if (result.ok) {
            if (typeof onSuccess === 'function') onSuccess(result);
          } else if (typeof onError === 'function') {
            onError(result);
          }
        }
      });

      container.innerHTML = '';
      window.google.accounts.id.renderButton(container, {
        theme: 'outline',
        size: 'large',
        shape: 'pill',
        width: 280,
        text: 'continue_with'
      });
    } catch (err) {
      const isFileProtocol = window.location && window.location.protocol === 'file:';
      let msg = 'Google Sign-In could not be initialized.';

      if (isFileProtocol) {
        msg = 'Google Sign-In requires http://localhost or https:// domain. Opening HTML via file:// is not supported by OAuth origins.';
      } else {
        msg = `Google Sign-In setup error on origin ${window.location.origin}. Add this exact origin to Authorized JavaScript origins in Google Cloud.`;
      }

      if (typeof onError === 'function') {
        onError({ ok: false, msg: msg + ' Details: ' + (err && err.message ? err.message : 'Unknown error') });
      }
      return { ok: false, msg };
    }

    if (autoPrompt) window.google.accounts.id.prompt();
    return { ok: true };
  },

  // Update user profile
  updateUser(updates) {
    const user = this.getUser();
    if (!user) return false;
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === user.id);
    if (idx === -1) return false;
    Object.assign(users[idx], updates);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    const safeUser = { ...users[idx] };
    delete safeUser.passwordHash;
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(safeUser));
    return true;
  }
};
