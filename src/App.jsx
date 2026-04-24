import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import WriteBlog from './pages/WriteBlog';
import ReadBlog from './pages/ReadBlog';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { isLoggedIn } from './utils/auth';

function Layout({ children }) {
  const location = useLocation();
  // Hide Navbar on login/register/landing
  const hideNavbar =
    location.pathname === '/login' ||
    location.pathname === '/register' ||
    location.pathname === '/' ||
    location.pathname === '/about' ||
    location.pathname === '/features';
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 transition-colors">
      {!hideNavbar && <Navbar />}
      {children}
    </div>
  );
}

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        {/* Public landing and marketing pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/about" element={<LandingPage />} />
        <Route path="/features" element={<LandingPage />} />

        {/* Auth pages */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected app pages */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/documents"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/write"
          element={
            <ProtectedRoute>
              <WriteBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit"
          element={
            <ProtectedRoute>
              <WriteBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <WriteBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/blog/:id"
          element={
            <ProtectedRoute>
              <ReadBlog />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute requiredRole="admin">
              <UserManagement />
            </ProtectedRoute>
          }
        />

        {/* Unauthorized page */}
        <Route
          path="/unauthorized"
          element={
            <div className="flex items-center justify-center min-h-screen">
              <div className="max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow text-center">
                <h2 className="text-2xl font-bold mb-4">Unauthorized</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  You do not have permission to access this page.
                </p>
                <a
                  href="/"
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-medium transition-colors"
                >
                  Go Home
                </a>
              </div>
            </div>
          }
        />

        {/* Fallback: redirect unknown routes */}
        <Route
          path="*"
          element={
            isLoggedIn() ? <Navigate to="/dashboard" replace /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </Layout>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;