import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminPanel.css';
import AdminDashboard from './AdminDashboard';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [loginData, setLoginData] = useState({
    username: '',
    password: ''
  });
  const [admin, setAdmin] = useState(null);

  // Check if admin is already logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      verifyToken(token);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/verify`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setAdmin(data.admin);
        setIsAuthenticated(true);
      } else {
        localStorage.removeItem('adminToken');
      }
    } catch (error) {
      console.error('Token verification error:', error);
      localStorage.removeItem('adminToken');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(loginData)
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('adminToken', data.token);
        setAdmin(data.admin);
        setIsAuthenticated(true);
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    setIsAuthenticated(false);
    setAdmin(null);
    setLoginData({ username: '', password: '' });
    navigate('/contact');
  };

  const handleInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  return (
    <div className="admin-page">
      <div className="admin-page-container">
        {!isAuthenticated ? (
          <div className="admin-login-container">
            <div className="admin-login-header">
              <h2>Admin Login</h2>
              <p>Enter your credentials to access the admin panel</p>
            </div>
            
            <form onSubmit={handleLogin} className="admin-login-form">
              {error && <div className="admin-error-message">{error}</div>}
              
              <div className="admin-form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={loginData.username}
                  onChange={handleInputChange}
                  required
                  autoComplete="username"
                />
              </div>
              
              <div className="admin-form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={loginData.password}
                  onChange={handleInputChange}
                  required
                  autoComplete="current-password"
                />
              </div>
              
              <button 
                type="submit" 
                className="admin-login-button"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
          </div>
        ) : (
          <div className="admin-dashboard">
            <div className="admin-dashboard-header">
              <div>
                <h2>Admin Dashboard</h2>
                <p>Welcome back, {admin?.username}</p>
              </div>
              <button onClick={handleLogout} className="admin-logout-button">
                Logout
              </button>
            </div>
            
            <AdminDashboard />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
