import React from 'react';

const Loader = () => (
  <div style={{ textAlign: 'center', padding: 24 }}>
    <div className="loader" style={{
      border: '4px solid #f3f3f3',
      borderTop: '4px solid #1976d2',
      borderRadius: '50%',
      width: 32,
      height: 32,
      animation: 'spin 1s linear infinite',
      margin: '0 auto'
    }} />
    <style>
      {`@keyframes spin { 100% { transform: rotate(360deg); } }`}
    </style>
  </div>
);

export default Loader; 