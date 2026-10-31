import { useEffect, useState } from 'react';

const TOKEN_KEY = 'nails-auth-token';

export default function useAuth() {
     const [user, setUser] = useState(null);
      const [loading, setLoading] = useState(true);
       const [error, setError] = useState('');

useEffect(() => { const controller = new AbortController();
    
async function restoreSession() {
  try {
    const token = sessionStorage.getItem(TOKEN_KEY);
    if (!token) return;

    const response = await fetch('/api/auth/me', {
      headers: { Authorization: 'Bearer ' + token },
      signal: controller.signal,
    });

    if (response.status === 401) {
      sessionStorage.removeItem(TOKEN_KEY);
      return;
    }

    if (!response.ok) {
      throw new Error('Не вдалося перевірити вхід.');
    }

    const data = await response.json();

    if (!controller.signal.aborted) {
      setUser(data);
    }
  } catch (err) {
    if (!controller.signal.aborted) {
      setError(err.message);
    }
  } finally {
    if (!controller.signal.aborted) {
      setLoading(false);
    }
  }
}

restoreSession();
return () => controller.abort();
}, []);
async function login(email, password) { setLoading(true); setError('');
try {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Не вдалося увійти.');
  }

  sessionStorage.setItem(TOKEN_KEY, data.token);
  setUser(data.user);
  return true;
} catch (err) {
  setError(err.message);
  return false;
} finally {
  setLoading(false);
}
}
async function logout() { setLoading(true); setError('');
try {
  const token = sessionStorage.getItem(TOKEN_KEY);

  const response = await fetch('/api/auth/logout', {
    method: 'POST',
    headers: { Authorization: 'Bearer ' + token },
  });

  if (!response.ok && response.status !== 401) {
    throw new Error('Не вдалося вийти. Спробуйте ще раз.');
  }

  sessionStorage.removeItem(TOKEN_KEY);
  setUser(null);
} catch (err) {
  setError(err.message);
} finally {
  setLoading(false);
}
}
return { user, loading, error, login, logout }; }