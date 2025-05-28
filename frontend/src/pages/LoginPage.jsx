import React, { useState } from 'react';
import { login } from '../api/authApi';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await login({ email, password });
      const token = res.data.token;
      localStorage.setItem('token', token);
      alert('Đăng nhập thành công!');
      window.location.href = '/';
    } catch (err) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại!');
    }
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 400, margin: '60px auto', padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 16 }}>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Mật khẩu:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 8, marginTop: 4 }}
          />
        </div>
        {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
        <button type="submit" style={{ width: '100%', padding: 10 }} disabled={loading}>
          {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
    