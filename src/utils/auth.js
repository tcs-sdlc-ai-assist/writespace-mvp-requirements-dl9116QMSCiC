/**
 * Authentication/session utility functions for WriteSpace.
 * Handles login, register, logout, and role checks using localStorage.
 * All functions handle errors gracefully and never throw.
 */

import {
  getUsers,
  setUsers,
  getSession,
  setSession,
  removeSession,
} from './storage';

/**
 * Register a new user.
 * @param {Object} user - { username, password, role }
 * @returns {{ success: boolean, error?: string }}
 */
export function register(user) {
  try {
    const { username, password, role } = user;
    if (!username || !password) {
      return { success: false, error: 'Username and password are required.' };
    }
    const users = getUsers();
    const exists = users.some(u => u.username === username);
    if (exists) {
      return { success: false, error: 'Username already exists.' };
    }
    const newUser = {
      username,
      password, // In production, hash the password!
      role: role || 'user',
      createdAt: Date.now(),
    };
    users.push(newUser);
    setUsers(users);
    setSession({ username, role: newUser.role, loginAt: Date.now() });
    return { success: true };
  } catch (e) {
    return { success: false, error: 'Registration failed.' };
  }
}

/**
 * Login a user.
 * @param {string} username
 * @param {string} password
 * @returns {{ success: boolean, error?: string }}
 */
export function login(username, password) {
  try {
    if (!username || !password) {
      return { success: false, error: 'Username and password are required.' };
    }
    const users = getUsers();
    const user = users.find(u => u.username === username);
    if (!user) {
      return { success: false, error: 'User not found.' };
    }
    if (user.password !== password) {
      return { success: false, error: 'Incorrect password.' };
    }
    setSession({ username: user.username, role: user.role, loginAt: Date.now() });
    return { success: true };
  } catch (e) {
    return { success: false, error: 'Login failed.' };
  }
}

/**
 * Logout the current user.
 * @returns {boolean} true if successful, false otherwise
 */
export function logout() {
  return removeSession();
}

/**
 * Get the current session user.
 * @returns {{ username: string, role: string, loginAt: number }|null}
 */
export function getCurrentUser() {
  const session = getSession();
  if (!session || !session.username) return null;
  return session;
}

/**
 * Check if a user is logged in.
 * @returns {boolean}
 */
export function isLoggedIn() {
  const session = getSession();
  return !!(session && session.username);
}

/**
 * Check if the current user has a specific role.
 * @param {string} role
 * @returns {boolean}
 */
export function hasRole(role) {
  const session = getSession();
  if (!session || !session.role) return false;
  return session.role === role;
}

/**
 * Check if the current user is admin.
 * @returns {boolean}
 */
export function isAdmin() {
  return hasRole('admin');
}

/**
 * Check if the current user is editor.
 * @returns {boolean}
 */
export function isEditor() {
  return hasRole('editor');
}