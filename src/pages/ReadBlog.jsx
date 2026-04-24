import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Avatar from '../components/Avatar';
import { getPosts, setPosts, getUsers } from '../utils/storage';
import { getCurrentUser, isAdmin, isEditor } from '../utils/auth';

/**
 * ReadBlog page - displays a single blog post with author, edit/delete controls.
 */
function ReadBlog() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError('');
    try {
      const posts = getPosts();
      const found = posts.find(p => String(p.id) === String(id));
      if (!found) {
        setError('Post not found.');
        setLoading(false);
        return;
      }
      setPost(found);
      const users = getUsers();
      const authorUser = users.find(u => u.username === found.author);
      setAuthor(authorUser || { username: found.author, role: 'user' });
      setLoading(false);
    } catch (e) {
      setError('Failed to load post.');
      setLoading(false);
    }
  }, [id]);

  const currentUser = getCurrentUser();
  const canEdit =
    currentUser &&
    post &&
    (isAdmin() || isEditor() || currentUser.username === post.author);

  const handleEdit = () => {
    navigate(`/edit/${post.id}`);
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this post?')) return;
    setDeleting(true);
    try {
      const posts = getPosts();
      const filtered = posts.filter(p => String(p.id) !== String(post.id));
      setPosts(filtered);
      setDeleting(false);
      navigate('/'); // Go back to home or posts list
    } catch (e) {
      setError('Failed to delete post.');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[40vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto mt-12 p-6 bg-red-100 text-red-700 rounded text-center">
        {error}
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white dark:bg-gray-900 rounded-lg shadow p-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{post.title}</h1>
      <div className="flex items-center gap-3 mb-6">
        <Avatar role={author?.role || 'user'} />
        <span className="text-gray-700 dark:text-gray-300 font-medium">{author?.username}</span>
        <span className="text-gray-400 text-sm ml-2">
          {post.createdAt
            ? new Date(post.createdAt).toLocaleString()
            : ''}
        </span>
      </div>
      <div className="prose dark:prose-invert max-w-none mb-8">
        {post.content ? (
          post.content.split('\n').map((line, idx) => (
            <p key={idx}>{line}</p>
          ))
        ) : (
          <p className="italic text-gray-400">No content.</p>
        )}
      </div>
      {canEdit && (
        <div className="flex gap-3">
          <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors font-medium"
            onClick={handleEdit}
            type="button"
          >
            Edit
          </button>
          <button
            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded transition-colors font-medium"
            onClick={handleDelete}
            disabled={deleting}
            type="button"
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      )}
    </div>
  );
}

export default ReadBlog;