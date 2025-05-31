import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const location = useLocation();

  return (
    <nav style={{
      width: '250px',
      height: '100vh',
      position: 'fixed',
      left: 0,
      top: 0,
      backgroundColor: '#fff',
      padding: '2rem 1rem',
      boxShadow: '2px 0 4px rgba(0,0,0,0.1)',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <div style={{
        marginBottom: '2rem',
        padding: '0 1rem'
      }}>
        <h1 style={{
          fontSize: '1.5rem',
          color: '#2d3436',
          margin: 0
        }}>
          Project Manager
        </h1>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem'
      }}>
        <Link
          to="/dashboard"
          style={{
            padding: '0.75rem 1rem',
            textDecoration: 'none',
            color: location.pathname === '/dashboard' ? '#0984e3' : '#636e72',
            backgroundColor: location.pathname === '/dashboard' ? '#f5f6fa' : 'transparent',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          📊 Dashboard
        </Link>

        <Link
          to="/projects"
          style={{
            padding: '0.75rem 1rem',
            textDecoration: 'none',
            color: location.pathname === '/projects' ? '#0984e3' : '#636e72',
            backgroundColor: location.pathname === '/projects' ? '#f5f6fa' : 'transparent',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          📁 Projects
        </Link>

        <Link
          to="/team"
          style={{
            padding: '0.75rem 1rem',
            textDecoration: 'none',
            color: location.pathname === '/team' ? '#0984e3' : '#636e72',
            backgroundColor: location.pathname === '/team' ? '#f5f6fa' : 'transparent',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          👥 Team
        </Link>

        <Link
          to="/settings"
          style={{
            padding: '0.75rem 1rem',
            textDecoration: 'none',
            color: location.pathname === '/settings' ? '#0984e3' : '#636e72',
            backgroundColor: location.pathname === '/settings' ? '#f5f6fa' : 'transparent',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
          }}
        >
          ⚙️ Settings
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
