import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const Navbar = () => {
    const { user, logout } = useAuth();
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/dashboard">AuthApp</Link>
            </div>
            <div className="navbar-links">
                {/* ============ LINKS VISIBLE TO ALL AUTHENTICATED USERS ============ */}
                {user && (
                    <>
                        <Link to="/dashboard">Dashboard</Link>
                    </>
                )}
                {/* ============ ADMIN-ONLY LINKS (Role-based) ============ */}
                {/* Only renders when user.role is 'admin' or 'superadmin' */}
                {user?.role === 'ADMIN' && (
                    <Link to="/admin">Admin Panel</Link>
                )}

                {/* Alternative: Using utility function */}
                {/* {isAdmin(user) && <Link to="/admin">Admin Panel</Link>
 {/* Alternative: Using utility function */}
                {/* {isAdmin(user) && <Link to="/admin">Admin Panel</Link>} */}

                {/* ============ AUTH STATE BASED CONTROLS ============ */}
                {!user && (
                    <Link to="/login">Login</Link>
                )}
            </div>
            <div className="navbar-user-section">
                {user && (
                    <>
                        <span className="user-greeting">
                            Hello, {user?.username || 'User'}
                        </span>
                        <span className={`role-badge role-${user?.role}`}>
                            {user?.role}
                        </span>
                        <button onClick={logout} className="btn-logout">
                            Logout</button>
                    </>
                )}
            </div>
        </nav>
    );
};
export default Navbar;