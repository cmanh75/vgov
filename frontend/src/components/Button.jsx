import React from 'react';

const Button = ({ children, onClick, type = 'button', style, disabled }) => (
  <button
    type={type}
    onClick={onClick}
    style={{
      padding: '8px 16px',
      background: '#1976d2',
      color: '#fff',
      border: 'none',
      borderRadius: 4,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.7 : 1,
      ...style
    }}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button; 