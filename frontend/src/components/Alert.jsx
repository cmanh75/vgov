import React from 'react';

const Alert = ({ type = 'info', message }) => {
  const color = type === 'error' ? '#d32f2f' : type === 'success' ? '#388e3c' : '#1976d2';
  return (
    <div style={{
      background: color,
      color: '#fff',
      padding: '8px 16px',
      borderRadius: 4,
      marginBottom: 16
    }}>
      {message}
    </div>
  );
};

export default Alert; 