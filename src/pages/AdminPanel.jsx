import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user: currentUser } = useAuth();

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get('/users');
      // Sort users by numerical ID
      const sortedUsers = data.sort((a, b) => Number(a.id) - Number(b.id));
      setUsers(sortedUsers);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch user profiles from backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDeleteUser = async (id, username) => {
    if (id === currentUser.id) {
      alert('You cannot delete your own admin account.');
      return;
    }

    if (!window.confirm(`Are you sure you want to delete user "${username}" (ID: ${id})?`)) {
      return;
    }

    try {
      await axiosInstance.delete(`/users/${id}`);
      alert(`User "${username}" deleted successfully.`);
      // Refresh user list
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert('Failed to delete user.');
    }
  };

  const handlePromoteUser = async (id, currentRole) => {
    const nextRoleMap = {
      'USER': 'MANAGER',
      'MANAGER': 'HR',
      'HR': 'ADMIN',
      'ADMIN': 'USER'
    };
    
    const nextRole = nextRoleMap[currentRole?.toUpperCase()] || 'USER';

    if (!window.confirm(`Do you want to change this user's role to "${nextRole}"?`)) {
      return;
    }

    try {
      // Backend supports PUT or PATCH. Let's send a PATCH to /users/:id
      await axiosInstance.patch(`/users/${id}`, { role: nextRole });
      alert(`User role updated to "${nextRole}".`);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert('Failed to update user role.');
    }
  };

  return (
    <div className="panel-container">
      <div className="panel-header" style={{ borderLeft: '6px solid var(--danger)' }}>
        <h1>🔒 Admin Management Center</h1>
        <p>Manage registered candidates, customize system authorization roles, and view core training data.</p>
      </div>

      <div className="dashboard-section">
        <h2>Registered Users</h2>
        
        {loading ? (
          <div style={{ padding: '2rem', textAlignment: 'center' }}>
            <div className="glass-spinner" style={{ margin: '0 auto' }}></div>
            <p className="loading-text">Fetching database profiles...</p>
          </div>
        ) : error ? (
          <div className="error-banner">
            <span>⚠️ {error}</span>
          </div>
        ) : (
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Role</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>#{u.id}</td>
                    <td><strong>{u.username}</strong> {u.id === currentUser.id && '(You)'}</td>
                    <td>{u.emailid}</td>
                    <td>{u.age || 'N/A'}</td>
                    <td>
                      <span className={`role-badge role-${u.role?.toLowerCase()}`}>
                        {u.role}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button
                        className="btn btn-secondary"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}
                        onClick={() => handlePromoteUser(u.id, u.role)}
                      >
                        Cycle Role
                      </button>
                      <button
                        className="btn btn-logout"
                        style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem', margin: 0 }}
                        onClick={() => handleDeleteUser(u.id, u.username)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
