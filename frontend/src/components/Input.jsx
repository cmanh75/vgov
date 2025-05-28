import React from 'react';

const Input = ({ label, type = 'text', value, onChange, ...props }) => (
  <div style={{ marginBottom: 16 }}>
    {label && <label style={{ display: 'block', marginBottom: 4 }}>{label}</label>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
      {...props}
    />
  </div>
);

export default Input; 