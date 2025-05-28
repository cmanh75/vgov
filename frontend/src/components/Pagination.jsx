import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  return (
    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', margin: '16px 0' }}>
      <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>Trước</button>
      {[...Array(totalPages)].map((_, idx) => (
        <button
          key={idx + 1}
          onClick={() => onPageChange(idx + 1)}
          style={{ fontWeight: currentPage === idx + 1 ? 'bold' : 'normal' }}
        >
          {idx + 1}
        </button>
      ))}
      <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>Sau</button>
    </div>
  );
};

export default Pagination; 