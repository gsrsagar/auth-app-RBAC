import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { isAdmin, isManager, isHR, isUser } from '../utils/roleUtils';

const Dashboard = () => {
  const { user } = useAuth();

  const getRoleLabel = (role) => {
    switch (role?.toUpperCase()) {
      case 'ADMIN': return 'Administrator';
      case 'MANAGER': return 'Training Manager';
      case 'HR': return 'HR Administrator';
      case 'USER': return 'Student / Candidate';
      default: return 'Authenticated User';
    }
  };

  return (
    <div className="dashboard-layout">
      {/* Welcome Banner */}
      <div className="dashboard-header">
        <div>
          <h1>Welcome, {user?.username}!</h1>
          <p style={{ color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
            {getRoleLabel(user?.role)} Dashboard — ByteSplash Portal
          </p>
        </div>
        <span className={`role-badge role-${user?.role?.toLowerCase()}`}>
          {user?.role}
        </span>
      </div>

      {/* Profile Info Card */}
      <div className="profile-card">
        <div className="profile-avatar">
          {user?.username ? user.username[0].toUpperCase() : 'U'}
        </div>
        <div className="profile-details">
          <h2>{user?.username}</h2>
          <p>
            <span>✉️ {user?.emailid}</span>
            <span>🎂 Age: {user?.age}</span>
            <span>🆔 User Ref ID: #{user?.id}</span>
          </p>
        </div>
      </div>

      {/* Global Statistics */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-title">Current Training Courses</div>
          <div className="stat-value">4</div>
        </div>
        <div className="stat-card secondary">
          <div className="stat-title">Active Modules</div>
          <div className="stat-value">58</div>
        </div>
        <div className="stat-card accent">
          <div className="stat-title">Completed Placements</div>
          <div className="stat-value">142+</div>
        </div>
      </div>

      {/* Conditionally Rendered Admin Quick Actions */}
      {isAdmin(user) && (
        <section className="dashboard-section" style={{ border: '1px dashed rgba(239, 68, 68, 0.4)' }}>
          <h2 style={{ color: 'var(--danger)' }}>
            <span>🔒</span> Administrator Quick Panel
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Authorized administrator operations. Actions here will affect core configurations.
          </p>
          <div className="actions-list">
            <Link to="/admin" className="btn btn-primary">
              Open Admin Console
            </Link>
            <button className="btn btn-secondary" onClick={() => alert('Feature simulated: Generating system logs...')}>
              Download Global Logs
            </button>
            <button className="btn btn-secondary" onClick={() => alert('Feature simulated: Backing up Firestore database...')}>
              Trigger DB Backup
            </button>
          </div>
        </section>
      )}

      {/* Conditionally Rendered Manager Actions */}
      {(isManager(user) || isAdmin(user)) && (
        <section className="dashboard-section" style={{ border: '1px dashed rgba(245, 158, 11, 0.4)' }}>
          <h2 style={{ color: 'var(--warning)' }}>
            <span>📝</span> Curriculum Management Actions
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Modify modules, adjust subject hours, and assign tutors. Available to Managers & Admins.
          </p>
          <div className="actions-list">
            <Link to="/manager" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, var(--warning) 0%, var(--secondary) 100%)', boxShadow: '0 4px 15px rgba(245, 158, 11, 0.2)' }}>
              Open Course Manager
            </Link>
            <button className="btn btn-secondary" onClick={() => alert('Feature simulated: Creating subject...')}>
              Create New Subject
            </button>
            <button className="btn btn-secondary" onClick={() => alert('Feature simulated: Modifying course syllabus...')}>
              Update Syllabus Template
            </button>
          </div>
        </section>
      )}

      {/* Conditionally Rendered HR Actions */}
      {(isHR(user) || isAdmin(user)) && (
        <section className="dashboard-section" style={{ border: '1px dashed rgba(6, 182, 212, 0.4)' }}>
          <h2 style={{ color: 'var(--accent)' }}>
            <span>👥</span> Placement & Recruitment Panel
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Review candidate resume sheets, schedule interviews, and process placements.
          </p>
          <div className="actions-list">
            <Link to="/hr" className="btn btn-primary" style={{ background: 'linear-gradient(135deg, var(--accent) 0%, var(--primary) 100%)', boxShadow: '0 4px 15px rgba(6, 182, 212, 0.2)' }}>
              Open Placement Hub
            </Link>
            <button className="btn btn-secondary" onClick={() => alert('Feature simulated: Exporting resumes...')}>
              Export Resume Sheets
            </button>
            <button className="btn btn-secondary" onClick={() => alert('Feature simulated: Scheduling drive...')}>
              Schedule Campus Drive
            </button>
          </div>
        </section>
      )}

      {/* General Student Settings (USER role or any) */}
      {isUser(user) && (
        <section className="dashboard-section">
          <h2>
            <span>🎓</span> Your Learning Portal
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Access syllabus materials, daily recordings, and submit doubts.
          </p>
          <div className="actions-list">
            <button className="btn btn-primary" onClick={() => alert('Navigating to course material...')}>
              Access Course Material
            </button>
            <button className="btn btn-secondary" onClick={() => alert('Doubt ticket submitted successfully!')}>
              Submit Doubt Ticket
            </button>
            <button className="btn btn-secondary" onClick={() => alert('Preferences saved!')}>
              Notification Preferences
            </button>
          </div>
        </section>
      )}
    </div>
  );
};

export default Dashboard;
