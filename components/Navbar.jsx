import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { isAdmin, isManager, isHR } from '../utils/roleUtils';

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/dashboard">ByteSplash</Link>
      </div>

      <div className="navbar-links">
        {user && (
          <>
            <Link to="/dashboard" className={isActive('/dashboard')}>
              Dashboard
            </Link>
            
            {isAdmin(user) && (
              <Link to="/admin" className={isActive('/admin')}>
                Admin Panel
              </Link>
            )}

            {(isManager(user) || isAdmin(user)) && (
              <Link to="/manager" className={isActive('/manager')}>
                Manager Panel
              </Link>
            )}

            {(isHR(user) || isAdmin(user)) && (
              <Link to="/hr" className={isActive('/hr')}>
                HR Panel
              </Link>
            )}
          </>
        )}
      </div>

      <div className="navbar-user-section">
        {user ? (
          <>
            <span className="user-greeting">
              Hello, <strong>{user.username}</strong>
            </span>
            <span className={`role-badge role-${user.role.toLowerCase()}`}>
              {user.role}
            </span>
            <button onClick={logout} className="btn btn-logout">
              Logout
            </button>
          </>
        ) : (
          location.pathname !== '/login' && (
            <Link to="/login" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem' }}>
              Sign In
            </Link>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
