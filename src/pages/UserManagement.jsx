import React, { useState, useEffect } from 'react';
import UserRow from '../components/UserRow';
import StatCard from '../components/StatCard';
import {
  getUsers,
  setUsers,
} from '../utils/storage';
import {
  getCurrentUser,
  isAdmin,
  register,
} from '../utils/auth';

function UserManagement() {
  const [users, setUsersState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    username: '',
    password: '',
    role: 'user',
  });
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Load users on mount
  useEffect(() => {
    setLoading(true);
    setError('');
    try {
      const list = getUsers();
      setUsersState(list);
    } catch (e) {
      setError('Failed to load users.');
    }
    setLoading(false);
  }, []);

  // Check admin rights
  const currentUser = getCurrentUser();
  if (!currentUser || !isAdmin()) {
    return (
      <div className="max-w-xl mx-auto mt-16 p-8 bg-white dark:bg-gray-800 rounded-lg shadow text-center">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p className="text-gray-600 dark:text-gray-300">You must be an admin to view this page.</p>
      </div>
    );
  }

  // Prevent deleting last admin
  function canDelete(user) {
    if (user.role !== 'admin') return true;
    const adminCount = users.filter(u => u.role === 'admin').length;
    if (adminCount <= 1) return false;
    return true;
  }

  // Handle user deletion
  function handleDelete(userId) {
    setError('');
    setSuccessMsg('');
    try {
      const user = users.find(u => u.username === userId || u.id === userId);
      if (!user) return;
      if (user.role === 'admin' && !canDelete(user)) {
        setError('Cannot delete the last admin user.');
        return;
      }
      const updated = users.filter(u =>
        (u.username || u.id) !== userId
      );
      setUsers(updated);
      setUsersState(updated);
      setSuccessMsg('User deleted.');
    } catch (e) {
      setError('Failed to delete user.');
    }
  }

  // Handle form input
  function handleChange(e) {
    setForm(f => ({
      ...f,
      [e.target.name]: e.target.value,
    }));
  }

  // Handle user creation
  function handleCreate(e) {
    e.preventDefault();
    setCreating(true);
    setCreateError('');
    setSuccessMsg('');
    if (!form.username || !form.password) {
      setCreateError('Username and password are required.');
      setCreating(false);
      return;
    }
    // Prevent duplicate username
    if (users.some(u => u.username === form.username)) {
      setCreateError('Username already exists.');
      setCreating(false);
      return;
    }
    // Register user
    const result = register({
      username: form.username,
      password: form.password,
      role: form.role,
    });
    if (!result.success) {
      setCreateError(result.error || 'Failed to create user.');
      setCreating(false);
      return;
    }
    // After register, session is set to new user; restore admin session
    setUsersState(getUsers());
    setSuccessMsg('User created.');
    setForm({ username: '', password: '', role: 'user' });
    // Restore admin session
    window.localStorage.setItem('session', JSON.stringify(currentUser));
    setCreating(false);
  }

  // Stats
  const totalUsers = users.length;
  const adminCount = users.filter(u => u.role === 'admin').length;
  const editorCount = users.filter(u => u.role === 'editor').length;
  const userCount = users.filter(u => u.role === 'user').length;

  return (
    <div className="max-w-2xl mx-auto mt-12 p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6 text-center">User Management</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard
          icon={
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m13-7a4 4 0 11-8 0 4 4 0 018 0zM5 7a4 4 0 108 0 4 4 0 00-8 0z" />
            </svg>
          }
          label="Total Users"
          value={totalUsers}
          color="bg-blue-500"
        />
        <StatCard
          icon={
            <svg className="w-6 h-6 text-red-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5 9 6.343 9 8s1.343 3 3 3zm0 2c-2.67 0-8 1.337-8 4v2h16v-2c0-2.663-5.33-4-8-4z" />
            </svg>
          }
          label="Admins"
          value={adminCount}
          color="bg-red-500"
        />
        <StatCard
          icon={
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828A2 2 0 019 17H7v-2a2 2 0 012-2z" />
            </svg>
          }
          label="Editors"
          value={editorCount}
          color="bg-green-500"
        />
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Create New User</h2>
        <form className="flex flex-col sm:flex-row gap-2 sm:items-end" onSubmit={handleCreate}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="px-3 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.username}
            onChange={handleChange}
            autoComplete="off"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="px-3 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.password}
            onChange={handleChange}
            required
          />
          <select
            name="role"
            className="px-3 py-2 rounded border border-gray-300 dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.role}
            onChange={handleChange}
          >
            <option value="user">User</option>
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors"
            disabled={creating}
          >
            {creating ? 'Creating...' : 'Create'}
          </button>
        </form>
        {createError && <div className="text-red-500 mt-2">{createError}</div>}
        {successMsg && <div className="text-green-600 mt-2">{successMsg}</div>}
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-2">All Users</h2>
        {loading && <div className="text-gray-500">Loading users...</div>}
        {error && <div className="text-red-500 mb-2">{error}</div>}
        {users.length === 0 && !loading && (
          <div className="text-gray-500">No users found.</div>
        )}
        <div>
          {users.map(user => (
            <UserRow
              key={user.username || user.id}
              user={{
                id: user.username || user.id,
                name: user.username || user.name,
                email: user.email || '',
                role: user.role,
              }}
              onDelete={uid => {
                if (!canDelete(user)) {
                  setError('Cannot delete the last admin user.');
                  return;
                }
                if (window.confirm(`Delete user "${user.username || user.name}"?`)) {
                  handleDelete(uid);
                }
              }}
            />
          ))}
        </div>
        <div className="text-xs text-gray-400 mt-2">
          * You cannot delete the last admin user.
        </div>
      </div>
    </div>
  );
}

export default UserManagement;