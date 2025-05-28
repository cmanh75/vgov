import React from 'react';

const Home = () => {
  const token = localStorage.getItem('token');
  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };
  return (
    <div style={{ maxWidth: 600, margin: '60px auto', padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
      <h1>Chào mừng đến với Hệ thống Quản lý Dự án!</h1>
      <p>Đây là trang chủ của ứng dụng React kết nối với backend Spring Boot.</p>
      {token ? (
        <div>
          <p style={{ color: 'green' }}>Bạn đã đăng nhập.</p>
          <button onClick={handleLogout} style={{ padding: 8, marginTop: 12 }}>Đăng xuất</button>
        </div>
      ) : (
        <div>
          <p style={{ color: 'red' }}>Bạn chưa đăng nhập.</p>
          <a href="/login">
            <button style={{ padding: 8, marginTop: 12 }}>Đăng nhập</button>
          </a>
        </div>
      )}
    </div>
  );
};
export default Home;