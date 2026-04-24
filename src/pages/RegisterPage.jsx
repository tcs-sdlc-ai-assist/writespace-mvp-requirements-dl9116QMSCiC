import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../utils/auth';

const roles = [
  { value: 'user', label: 'User' },
  { value: 'editor', label: 'Editor' },
  { value: 'admin', label: 'Admin' },
];

function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirm: '',
    role: 'user',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm(f => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
    setError('');
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!form.username.trim() || !form.password) {
      setError('Username and password are required.');
      return;
    }
    if (form.password.length < 4) {
      setError('Password must be at least 4 characters.');
      return;
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    try {
      const res = await Promise.resolve(register({
        username: form.username.trim(),
        password: form.password,
        role: form.role,
      }));
      if (!res.success) {
        setError(res.error || 'Registration failed.');
        setLoading(false);
        return;
      }
      navigate('/');
    } catch (e) {
      setError('Registration failed.');
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 px-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white text-center">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="username">
              Username
            </label>
            <input
              id="username"
              name="username"
              type="text"
              autoComplete="username"
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              value={form.username}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              value={form.password}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="confirm">
              Confirm Password
            </label>
            <input
              id="confirm"
              name="confirm"
              type="password"
              autoComplete="new-password"
              required
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              value={form.confirm}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1" htmlFor="role">
              Role
            </label>
            <select
              id="role"
              name="role"
              className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-100 dark:bg-gray-700 text-gray-900 dark:text-white"
              value={form.role}
              onChange={handleChange}
              disabled={loading}
            >
              {roles.map(r => (
                <option key={r.value} value={r.value}>{r.label}</option>
              ))}
            </select>
          </div>
          {error && (
            <div className="text-red-600 dark:text-red-400 text-sm">{error}</div>
          )}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded transition-colors disabled:opacity-60"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-400">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;