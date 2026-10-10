import { useEffect, useState } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import BookingPage from './pages/BookingPage';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');

  useEffect(() => {
    if (token) {
      axios
        .get(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => setUser(res.data.user))
        .catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setToken('');
          setUser(null);
        });
    }
  }, [token]);

  const handleAuth = (authData) => {
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', JSON.stringify(authData.user));
    setToken(authData.token);
    setUser(authData.user);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken('');
    setUser(null);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <div className="brand-mark">HS</div>
          <div>
            <p className="brand-name">Home Service Hub</p>
            <span className="brand-subtitle">Trusted local help</span>
          </div>
        </div>

        <nav className="nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/booking">Book Now</NavLink>
          {user ? <NavLink to="/dashboard">Dashboard</NavLink> : null}
        </nav>

        <div className="nav-actions">
          {user ? (
            <>
              <span className="user-pill">Hi, {user.name}</span>
              <button className="secondary-btn" onClick={logout}>Logout</button>
            </>
          ) : (
            <NavLink className="primary-btn" to="/login">Login</NavLink>
          )}
        </div>
      </header>

      <main className="page-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/booking" element={<BookingPage token={token} user={user} />} />
          <Route path="/login" element={<LoginPage onAuth={handleAuth} />} />
          <Route path="/dashboard" element={<DashboardPage token={token} user={user} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
