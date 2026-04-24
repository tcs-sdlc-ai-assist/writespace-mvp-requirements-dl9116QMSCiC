import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getCurrentUser, isLoggedIn } from '../utils/auth';
import { getPosts, setPosts } from '../utils/storage';
import { useNavigate, useLocation } from 'react-router-dom';

/**
 * WriteBlog page for creating or editing a blog post.
 * - If editing: ?id=POST_ID in query string, loads post for editing.
 * - If creating: no id, creates new post.
 * - Only the post owner or admin can edit.
 */
function WriteBlog() {
  const navigate = useNavigate();
  const location = useLocation();

  // Parse ?id=... from query string
  const searchParams = new URLSearchParams(location.search);
  const postId = searchParams.get('id');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [initialLoaded, setInitialLoaded] = useState(false);

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    // Check login
    if (!isLoggedIn()) {
      setError('You must be logged in to write a blog post.');
      setLoading(false);
      return;
    }
    // If editing, load post
    if (postId) {
      const posts = getPosts();
      const post = posts.find(p => String(p.id) === String(postId));
      if (!post) {
        setError('Post not found.');
        setLoading(false);
        return;
      }
      const user = getCurrentUser();
      if (!user) {
        setError('You must be logged in.');
        setLoading(false);
        return;
      }
      // Ownership check: only owner or admin can edit
      if (post.author !== user.username && user.role !== 'admin') {
        setError('You do not have permission to edit this post.');
        setLoading(false);
        return;
      }
      setTitle(post.title);
      setContent(post.content);
      setIsEdit(true);
    }
    setLoading(false);
    setInitialLoaded(true);
  }, [postId]);

  function validate() {
    if (!title.trim()) return 'Title is required.';
    if (!content.trim()) return 'Content is required.';
    if (title.length > 120) return 'Title must be 120 characters or less.';
    if (content.length > 10000) return 'Content must be 10,000 characters or less.';
    return '';
  }

  function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const user = getCurrentUser();
      if (!user) {
        setError('You must be logged in.');
        return;
      }
      let posts = getPosts();
      if (isEdit) {
        // Edit existing post
        const idx = posts.findIndex(p => String(p.id) === String(postId));
        if (idx === -1) {
          setError('Post not found.');
          return;
        }
        // Ownership check
        if (posts[idx].author !== user.username && user.role !== 'admin') {
          setError('You do not have permission to edit this post.');
          return;
        }
        posts[idx] = {
          ...posts[idx],
          title: title.trim(),
          content: content.trim(),
          updatedAt: Date.now(),
        };
        setPosts(posts);
        navigate(`/blog/${posts[idx].id}`);
      } else {
        // Create new post
        const newId = posts.length > 0 ? Math.max(...posts.map(p => Number(p.id) || 0)) + 1 : 1;
        const newPost = {
          id: newId,
          title: title.trim(),
          content: content.trim(),
          author: user.username,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };
        posts.push(newPost);
        setPosts(posts);
        navigate(`/blog/${newId}`);
      }
    } catch (e) {
      setError('Failed to save post.');
    }
  }

  if (loading || !initialLoaded) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-gray-800 rounded shadow text-red-600 dark:text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-6">{isEdit ? 'Edit Blog Post' : 'Write a New Blog Post'}</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
            Title
          </label>
          <input
            id="title"
            type="text"
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
            value={title}
            maxLength={120}
            onChange={e => setTitle(e.target.value)}
            required
            autoFocus
          />
          <div className="text-xs text-gray-400 mt-1">{title.length}/120</div>
        </div>
        <div>
          <label htmlFor="content" className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-200">
            Content
          </label>
          <textarea
            id="content"
            className="w-full h-64 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-50 dark:bg-gray-800 dark:border-gray-700 resize-vertical"
            value={content}
            maxLength={10000}
            onChange={e => setContent(e.target.value)}
            required
          />
          <div className="text-xs text-gray-400 mt-1">{content.length}/10000</div>
        </div>
        {error && (
          <div className="text-red-600 dark:text-red-400 text-sm">{error}</div>
        )}
        <div className="flex gap-3">
          <button
            type="submit"
            className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors font-medium"
          >
            {isEdit ? 'Update Post' : 'Publish Post'}
          </button>
          <button
            type="button"
            className="px-5 py-2 bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 rounded transition-colors font-medium"
            onClick={() => navigate(-1)}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

WriteBlog.propTypes = {};

export default WriteBlog;