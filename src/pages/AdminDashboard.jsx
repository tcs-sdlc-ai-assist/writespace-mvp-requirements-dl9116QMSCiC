import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import BlogCard from '../components/BlogCard';
import { getUsers, getPosts } from '../utils/storage';
import { getCurrentUser, isAdmin } from '../utils/auth';

function AdminDashboard() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    try {
      setUsers(getUsers());
      setPosts(getPosts());
    } catch (e) {
      setError('Failed to load dashboard data.');
    }
    setLoading(false);
  }, []);

  const currentUser = getCurrentUser();

  if (!currentUser || !isAdmin()) {
    return (
      <div className="max-w-xl mx-auto mt-16 p-8 bg-white dark:bg-gray-800 rounded-lg shadow text-center">
        <h2 className="text-2xl font-bold mb-4">Access Denied</h2>
        <p className="text-gray-600 dark:text-gray-300">You must be an admin to view this page.</p>
      </div>
    );
  }

  // Stats
  const totalUsers = users.length;
  const adminCount = users.filter(u => u.role === 'admin').length;
  const editorCount = users.filter(u => u.role === 'editor').length;
  const userCount = users.filter(u => u.role === 'user').length;
  const totalPosts = posts.length;
  const recentPosts = [...posts]
    .sort((a, b) => (b.updatedAt || b.createdAt || 0) - (a.updatedAt || a.createdAt || 0))
    .slice(0, 5);

  function handleEditPost(id) {
    navigate(`/edit?id=${id}`);
  }

  function handleDeletePost(id) {
    if (!window.confirm('Delete this post?')) return;
    try {
      const updated = posts.filter(p => String(p.id) !== String(id));
      setPosts(updated);
      window.localStorage.setItem('posts', JSON.stringify(updated));
    } catch (e) {
      setError('Failed to delete post.');
    }
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        <StatCard
          icon={
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m13-7a4 4 0 11-8 0 4 4 0 018 0zM5 7a4 4 0 108 0 4 4 0 00-8 0z" />
            </svg>
          }
          label="Users"
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
        <StatCard
          icon={
            <svg className="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-2 2 2h4a2 2 0 012 2v12a2 2 0 01-2 2z" />
            </svg>
          }
          label="Posts"
          value={totalPosts}
          color="bg-purple-500"
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-4 mb-10">
        <button
          className="flex-1 px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition-colors"
          onClick={() => navigate('/users')}
          type="button"
        >
          Manage Users
        </button>
        <button
          className="flex-1 px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded font-semibold transition-colors"
          onClick={() => navigate('/write')}
          type="button"
        >
          Create New Post
        </button>
      </div>
      <div>
        <h2 className="text-xl font-semibold mb-4">Recent Posts</h2>
        {loading && (
          <div className="text-gray-500">Loading...</div>
        )}
        {error && (
          <div className="text-red-500 mb-2">{error}</div>
        )}
        {recentPosts.length === 0 && !loading && (
          <div className="text-gray-500">No posts found.</div>
        )}
        <div>
          {recentPosts.map(post => (
            <BlogCard
              key={post.id}
              post={{
                id: post.id,
                title: post.title,
                excerpt: post.content ? post.content.slice(0, 120) + (post.content.length > 120 ? '...' : '') : '',
                author: users.find(u => u.username === post.author) || { name: post.author, role: 'user' },
                createdAt: post.createdAt,
              }}
              onEdit={handleEditPost}
              onDelete={handleDeletePost}
              accentColor="border-purple-500"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;