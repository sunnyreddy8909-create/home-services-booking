import { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

function LoginPage({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'customer',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin
        ? { email: form.email, password: form.password }
        : form;

      const res = await axios.post(`${API_URL}${endpoint}`, payload);
      onAuth(res.data);
      setSuccess(isLogin ? 'Login successful.' : 'Registration successful.');
      window.location.href = '/dashboard';
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <div className="auth-header">
          <span className="eyebrow">Account</span>
          <h2>{isLogin ? 'Welcome back' : 'Create account'}</h2>
        </div>

        <div className="toggle-row">
          <button
            className={isLogin ? 'toggle-btn active' : 'toggle-btn'}
            onClick={() => setIsLogin(true)}
            type="button"
          >
            Login
          </button>
          <button
            className={!isLogin ? 'toggle-btn active' : 'toggle-btn'}
            onClick={() => setIsLogin(false)}
            type="button"
          >
            Register
          </button>
        </div>

        <form onSubmit={submitForm} className="stack-form">
          {!isLogin && (
            <>
              <label>
                Full Name
                <input name="name" value={form.name} onChange={handleChange} required />
              </label>
              <label>
                Role
                <select name="role" value={form.role} onChange={handleChange}>
                  <option value="customer">Customer</option>
                  <option value="provider">Provider</option>
                  <option value="admin">Admin</option>
                </select>
              </label>
            </>
          )}

          <label>
            Email
            <input name="email" type="email" value={form.email} onChange={handleChange} required />
          </label>

          <label>
            Password
            <input name="password" type="password" value={form.password} onChange={handleChange} required />
          </label>

          {error ? <div className="alert error">{error}</div> : null}
          {success ? <div className="alert success">{success}</div> : null}

          <button className="primary-btn" type="submit">
            {isLogin ? 'Login' : 'Register'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
