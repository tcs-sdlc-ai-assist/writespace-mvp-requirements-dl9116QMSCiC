import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import PublicNavbar from '../components/PublicNavbar';
import { getPosts, getUsers } from '../utils/storage';

function LandingPage() {
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError('');
    try {
      const posts = getPosts();
      const users = getUsers();
      // Show 3 most recent posts
      const sorted = [...posts]
        .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0))
        .slice(0, 3)
        .map(post => {
          const author = users.find(u => u.username === post.author);
          return {
            ...post,
            author: {
              name: author?.username || post.author || 'Unknown',
              role: author?.role || 'user',
            },
            excerpt: post.content
              ? post.content.length > 120
                ? post.content.slice(0, 120) + '...'
                : post.content
              : '',
          };
        });
      setLatestPosts(sorted);
    } catch (e) {
      setError('Failed to load posts.');
    }
    setLoading(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900">
      <PublicNavbar />
      {/* Hero */}
      <section className="flex flex-col items-center justify-center text-center px-4 py-16 bg-gradient-to-b from-blue-50 dark:from-gray-900 to-transparent">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 text-gray-900 dark:text-white">
          Welcome to <span className="text-blue-600 dark:text-blue-400">WriteSpace</span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl">
          A modern, minimal writing platform for writers, bloggers, and note-takers. Create, edit, and manage your content efficiently in a distraction-free environment.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/register"
            className="px-8 py-3 rounded bg-blue-600 text-white font-semibold text-lg hover:bg-blue-700 transition-colors shadow"
          >
            Get Started
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 rounded bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-semibold text-lg border border-blue-200 dark:border-blue-700 hover:bg-blue-50 dark:hover:bg-gray-700 transition-colors shadow"
          >
            Log In
          </Link>
        </div>
      </section>
      {/* Features */}
      <section className="max-w-5xl mx-auto px-4 py-16">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10 text-gray-900 dark:text-white">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="mb-4">
              <svg className="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 17l4 4 4-4m0-5V3m-8 9V3m8 0H8" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Distraction-Free Writing</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Focus on your words with a clean, minimal interface and seamless autosave.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="mb-4">
              <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Instant Preview</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              See your writing as it will appear to readers, with live preview and formatting.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <div className="mb-4">
              <svg className="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v4a2 2 0 002 2h14a2 2 0 002-2V7M7 7V5a2 2 0 012-2h6a2 2 0 012 2v2" />
              </svg>
            </div>
            <h3 className="font-semibold text-lg mb-2 text-gray-900 dark:text-white">Organized & Secure</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Manage your documents with folders and user roles. Your work is saved locally for privacy.
            </p>
          </div>
        </div>
      </section>
      {/* Latest Posts */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">Latest Posts</h2>
        {loading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 bg-red-50 dark:bg-red-900 dark:text-red-200 rounded px-4 py-3">
            {error}
          </div>
        ) : latestPosts.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            No posts yet. Be the first to <Link to="/register" className="text-blue-600 dark:text-blue-400 underline">write one</Link>!
          </div>
        ) : (
          <div>
            {latestPosts.map(post => (
              <div key={post.id} className="cursor-pointer" onClick={() => navigate(`/blog/${post.id}`)}>
                <BlogCard post={post} accentColor="border-blue-500" />
              </div>
            ))}
          </div>
        )}
        <div className="text-center mt-6">
          <Link
            to="/login"
            className="inline-block px-6 py-2 rounded bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Explore More
          </Link>
        </div>
      </section>
      {/* Footer */}
      <footer className="mt-auto w-full py-8 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 text-center">
        <div className="text-gray-600 dark:text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} WriteSpace. Made with <span className="text-red-500">♥</span> using React &amp; Tailwind CSS.
        </div>
        <div className="mt-2 flex justify-center gap-4 text-xs">
          <Link to="/about" className="hover:underline text-blue-600 dark:text-blue-400">About</Link>
          <Link to="/features" className="hover:underline text-blue-600 dark:text-blue-400">Features</Link>
          <Link to="/login" className="hover:underline text-blue-600 dark:text-blue-400">Login</Link>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;