/**
 * Utility functions for managing localStorage schema for users, posts, and session.
 * All functions handle errors gracefully and never throw.
 */

/**
 * Save a value to localStorage under the given key.
 * @param {string} key
 * @param {any} value - Will be JSON.stringified
 * @returns {boolean} true if successful, false otherwise
 */
export function setItem(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    // Could be quota exceeded, invalid value, etc.
    return false;
  }
}

/**
 * Get a value from localStorage by key.
 * @param {string} key
 * @returns {any|null} Parsed value, or null if not found or error
 */
export function getItem(key) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

/**
 * Remove a key from localStorage.
 * @param {string} key
 * @returns {boolean} true if successful, false otherwise
 */
export function removeItem(key) {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Clear all localStorage.
 * @returns {boolean} true if successful, false otherwise
 */
export function clearStorage() {
  try {
    window.localStorage.clear();
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Get all users from localStorage.
 * @returns {Array<Object>} Array of user objects, or empty array if none/error
 */
export function getUsers() {
  const users = getItem('users');
  return Array.isArray(users) ? users : [];
}

/**
 * Save all users to localStorage.
 * @param {Array<Object>} users
 * @returns {boolean}
 */
export function setUsers(users) {
  return setItem('users', users);
}

/**
 * Get all posts from localStorage.
 * @returns {Array<Object>} Array of post objects, or empty array if none/error
 */
export function getPosts() {
  const posts = getItem('posts');
  return Array.isArray(posts) ? posts : [];
}

/**
 * Save all posts to localStorage.
 * @param {Array<Object>} posts
 * @returns {boolean}
 */
export function setPosts(posts) {
  return setItem('posts', posts);
}

/**
 * Get current session from localStorage.
 * @returns {Object|null} Session object or null if not found/error
 */
export function getSession() {
  return getItem('session');
}

/**
 * Save session to localStorage.
 * @param {Object} session
 * @returns {boolean}
 */
export function setSession(session) {
  return setItem('session', session);
}

/**
 * Remove session from localStorage.
 * @returns {boolean}
 */
export function removeSession() {
  return removeItem('session');
}