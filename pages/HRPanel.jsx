import { useState } from 'react';

const HRPanel = () => {
  const [drives, setDrives] = useState([
    { id: 1, company: 'ByteSplash Solutions', pkg: '8.5 LPA', role: 'React Developer', date: '2026-08-10', status: 'Recruiting' },
    { id: 2, company: 'Google Cloud Partner', pkg: '12.0 LPA', role: 'Full Stack Engineer', date: '2026-08-15', status: 'Open' },
    { id: 3, company: 'Wipro Limited', pkg: '4.8 LPA', role: 'Associate Developer', date: '2026-07-28', status: 'Scheduled' },
  ]);

  const [logs] = useState([
    { time: '12:04:12', type: 'INFO', event: 'Token refresh requested', user: 'johndoe' },
    { time: '11:58:34', type: 'WARN', event: 'Failed login attempt (mismatched pass)', user: 'alex_instructor' },
    { time: '10:15:02', type: 'SECURITY', event: 'Role update executed (USER -> MANAGER)', user: 'sys_admin' },
    { time: '09:42:18', type: 'INFO', event: 'Syllabus modified', user: 'alex_instructor' },
  ]);

  const handleAddDrive = () => {
    const company = prompt('Enter Company Name:');
    if (!company) return;
    const pkg = prompt('Enter Package (e.g. 6.5 LPA):') || 'N/A';
    const role = prompt('Enter Role Name:') || 'Frontend Developer';
    const date = new Date().toISOString().split('T')[0];
    
    setDrives((prev) => [
      ...prev,
      { id: prev.length + 1, company, pkg, role, date, status: 'Open' }
    ]);
  };

  return (
    <div className="panel-container">
      <div className="panel-header" style={{ borderLeft: '6px solid var(--accent)' }}>
        <h1>👥 Placement & Recruitment Hub</h1>
        <p>Coordinate student placements, schedule corporate interview drives, and examine active audit trails.</p>
      </div>

      <div className="panel-grid">
        {/* Placement Roster */}
        <div className="dashboard-section" style={{ flex: 1.5 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2>Upcoming Drives</h2>
            <button className="btn btn-primary" onClick={handleAddDrive} style={{ padding: '0.4rem 0.8rem', fontSize: '0.85rem' }}>
              + Schedule Drive
            </button>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Company</th>
                  <th>Role</th>
                  <th>Package</th>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {drives.map((d) => (
                  <tr key={d.id}>
                    <td><strong>{d.company}</strong></td>
                    <td>{d.role}</td>
                    <td>{d.pkg}</td>
                    <td>{d.date}</td>
                    <td>
                      <span className="role-badge role-hr" style={{ fontSize: '0.7rem' }}>
                        {d.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Security Logs */}
        <div className="dashboard-section" style={{ flex: 1 }}>
          <h2>Audit Logs</h2>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Event</th>
                  <th>User</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((l, idx) => (
                  <tr key={idx}>
                    <td><code style={{ color: 'var(--text-secondary)' }}>{l.time}</code></td>
                    <td>
                      <span style={{ 
                        color: l.type === 'WARN' ? 'var(--warning)' : l.type === 'SECURITY' ? 'var(--danger)' : 'var(--text-primary)',
                        fontSize: '0.85rem'
                      }}>
                        [{l.type}] {l.event}
                      </span>
                    </td>
                    <td><code style={{ fontSize: '0.8rem' }}>{l.user}</code></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRPanel;
