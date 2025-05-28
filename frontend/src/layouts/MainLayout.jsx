import React from 'react';

const MainLayout = ({ children }) => (
  <div>
    <header style={{ padding: 16, background: '#1976d2', color: '#fff' }}>
      <h2>Quản lý dự án</h2>
    </header>
    <main style={{ minHeight: '80vh', padding: 24 }}>{children}</main>
    <footer style={{ padding: 16, background: '#eee', textAlign: 'center' }}>
      &copy; {new Date().getFullYear()} Project Management
    </footer>
  </div>
);

export default MainLayout; 