const AdminPanel = () => {
    return (
        <div className="admin-panel">
            <h1>🔒 Admin Panel — Sensitive Data</h1>

            <div className="admin-sections">
                <section className="admin-card">
                    <h2>User Management</h2>
                    <p>View, edit, and manage all users in the system.</p>
                    <button disabled>Manage Users</button>
                </section>
                <section className="admin-card">
                    <h2>System Settings</h2>
                    <p>Configure global application settings.</p>
                    <button disabled>Settings</button>
                </section>
                <section className="admin-card">
                    <h2>Analytics Dashboard</h2>
                    <p>View system-wide analytics and reports.</p>
                    <button disabled>View Analytics</button>
                </section>
            </div>
        </div>
    );
};
export default AdminPanel;