import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import { getPosts, getUsers } from '../utils/storage';
import { getCurrentUser, isLoggedIn, isAdmin, isEditor } from '../utils/auth';

/**
 * Home page - shows all blog posts in a responsive grid for authenticated users.
 */
function Home() {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    try {
      const postsList = getPosts();
      const usersList = getUsers();
      setPosts(postsList.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0)));
      setUsers(usersList);
    } catch (e) {
      setError('Failed to load posts.');
    }
    setLoading(false);
  }, []);

  if (!isLoggedIn()) {
    navigate('/login', { replace: true });
    return null;
  }

  const currentUser = getCurrentUser();

  function getAuthor(post) {
    const user = users.find(u => u.username === post.author);
    if (user) {
      return { name: user.username, role: user.role };
    }
    return { name: post.author || 'Unknown', role: 'user' };
  }

  function canEdit(post) {
    if (!currentUser) return false;
    return (
      isAdmin() ||
      isEditor() ||
      post.author === currentUser.username
    );
  }

  function handleEdit(id) {
    navigate(`/edit?id=${id}`);
  }

  function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    try {
      const updated = posts.filter(p => String(p.id) !== String(id));
      window.localStorage.setItem('posts', JSON.stringify(updated));
      setPosts(updated);
    } catch (e) {
      setError('Failed to delete post.');
    }
  }

  function handleRead(id) {
    navigate(`/blog/${id}`);
  }

  return (
    <div className="max-w-5xl mx-auto mt-10 px-2">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Blog Posts</h1>
        <button
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors"
          onClick={() => navigate('/write')}
          type="button"
        >
          Write New Post
        </button>
      </div>
      {loading && (
        <div className="flex justify-center items-center min-h-[20vh]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded">{error}</div>
      )}
      {!loading && posts.length === 0 && (
        <div className="text-gray-500 dark:text-gray-400 text-center mt-16">
          No blog posts yet.
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {posts.map(post => (
          <div
            key={post.id}
            className="cursor-pointer"
            onClick={e => {
              // Prevent card click if edit/delete button is clicked
              if (
                e.target.closest('button') ||
                e.target.tagName === 'BUTTON' ||
                e.target.closest('svg')
              ) {
                return;
              }
              handleRead(post.id);
            }}
            role="button"
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter') handleRead(post.id);
            }}
          >
            <BlogCard
              post={{
                ...post,
                author: getAuthor(post),
                excerpt:
                  post.content && post.content.length > 160
                    ? post.content.slice(0, 157) + '...'
                    : post.content,
              }}
              onEdit={canEdit(post) ? handleEdit : undefined}
              onDelete={canEdit(post) ? handleDelete : undefined}
              accentColor="border-blue-500"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;