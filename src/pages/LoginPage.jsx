import React, { useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { login, isLoggedIn } from '../utils/auth';

function LoginPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (isLoggedIn()) {
    return <Navigate to="/" replace />;
  }

  const handleChange = e => {
    setForm(f => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
    setError('');
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    if (!form.username.trim() || !form.password) {
      setError('Username and password are required.');
      return;
    }
    setLoading(true);
    try {
      // Simulate async for UX
      await new Promise(res => setTimeout(res, 400));
      const result = login(form.username.trim(), form.password);
      if (result.success) {
        navigate('/', { replace: true });
      } else {
        setError(result.error || 'Login failed.');
      }
    } catch (e) {
      setError('Unexpected error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 dark:bg-slate-900">
      <form
        className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow p-8"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Sign in to WriteSpace</h1>
        {error && (
          <div className="mb-4 text-red-600 bg-red-50 dark:bg-red-900 dark:text-red-200 rounded px-3 py-2 text-sm">
            {error}
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium" htmlFor="username">
            Username
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition"
            id="username"
            name="username"
            type="text"
            value={form.username}
            onChange={handleChange}
            disabled={loading}
            autoFocus
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block mb-1 text-gray-700 dark:text-gray-300 font-medium" htmlFor="password">
            Password
          </label>
          <input
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition"
            id="password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            disabled={loading}
            required
          />
        </div>
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors disabled:opacity-60 disabled:cursor-not-allowed`}
          disabled={loading}
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
        <div className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          Don&apos;t have an account?{' '}
          <button
            type="button"
            className="text-blue-600 hover:underline dark:text-blue-400"
            onClick={() => navigate('/register')}
            disabled={loading}
          >
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default LoginPage;