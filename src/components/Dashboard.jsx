import { useAuth } from '../context/AuthContext';


const Dashboard = () => {
    const { user, logout } = useAuth();
    return (
        <div className="dashboard-container">
            <h1>Welcome, {user?.name || 'User'}!</h1>

            <div className="user-info-card">
                <h2>User Information</h2>
                <ul>
                    <li><strong>Name:</strong> {user?.name}</li>
                    <li><strong>Email:</strong> {user?.email}</li>
                    <li><strong>Role:</strong> <span className={`role-badge role-
${user?.role}`}>{user?.role}</span></li>
                    <li><strong>User ID:</strong> {user?.id}</li>
                </ul>
            </div>
            <div className="dashboard-actions">
                <button onClick={logout} className="btn-logout">
                    Logout</button>
            </div>
        </div>
    );
};
export default Dashboard;
