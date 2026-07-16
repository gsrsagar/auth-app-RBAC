import { useEffect, useState } from 'react';
import axiosInstance from '../api/axiosInstance';

const ManagerPanel = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCourse, setSelectedCourse] = useState(null);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get('/courses');
      setCourses(data);
      if (data.length > 0) {
        setSelectedCourse(data[0]);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to load course list from backend.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="panel-container">
      <div className="panel-header" style={{ borderLeft: '6px solid var(--warning)' }}>
        <h1>📝 Training Curriculum Manager</h1>
        <p>Define syllabus templates, organize modules, and inspect candidate progress across schedules.</p>
      </div>

      {loading ? (
        <div style={{ padding: '2rem', textAlignment: 'center' }}>
          <div className="glass-spinner" style={{ margin: '0 auto' }}></div>
          <p className="loading-text">Loading courses...</p>
        </div>
      ) : error ? (
        <div className="error-banner">
          <span>⚠️ {error}</span>
        </div>
      ) : (
        <div className="panel-grid">
          {/* Courses List */}
          <div className="dashboard-section" style={{ flex: 1 }}>
            <h2>Available Courses ({courses.length})</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {courses.map((c) => (
                <div
                  key={c.id}
                  className="panel-card"
                  style={{
                    cursor: 'pointer',
                    borderColor: selectedCourse?.id === c.id ? 'var(--warning)' : 'var(--border-color)',
                    background: selectedCourse?.id === c.id ? 'rgba(245, 158, 11, 0.05)' : 'var(--bg-card)'
                  }}
                  onClick={() => setSelectedCourse(c)}
                >
                  <h3>📚 {c.title}</h3>
                  <p style={{ margin: '0.5rem 0' }}>{c.description?.substring(0, 120)}...</p>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    <span>📖 {c.subjects?.length || 0} Subjects</span>
                    <span>📑 {c.pdfUrl || 'No PDF'}</span>
                  </div>
                </div>
              ))}
              
              <button 
                className="btn btn-secondary" 
                style={{ width: '100%', borderStyle: 'dashed' }}
                onClick={() => alert('Feature simulated: Adding a new course...')}
              >
                + Add Course Shell
              </button>
            </div>
          </div>

          {/* Course Details / Syllabus Inspector */}
          {selectedCourse && (
            <div className="dashboard-section" style={{ flex: 2 }}>
              <h2>Syllabus Inspector</h2>
              <div className="panel-card" style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.4rem', color: 'var(--warning)' }}>{selectedCourse.title}</h3>
                <p style={{ margin: '1rem 0' }}>{selectedCourse.description}</p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <a href={selectedCourse.youtubePlaylistUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    🎥 Playlist Link
                  </a>
                  <a href={selectedCourse.syllabusUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                    🔗 Course Details
                  </a>
                </div>
              </div>

              <h3>Subjects & Schedules</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '1rem' }}>
                {selectedCourse.subjects?.map((sub, idx) => (
                  <div
                    key={idx}
                    className="panel-card"
                    style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '1rem 1.25rem' }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <h4 style={{ fontWeight: 700 }}>{sub.name}</h4>
                      <span className="role-badge role-user" style={{ fontSize: '0.7rem' }}>
                        {sub.status || 'Active'}
                      </span>
                    </div>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                      Modules: {sub.completedModules} / {sub.totalModules} completed
                    </p>
                    {sub.modules && sub.modules.length > 0 && (
                      <div style={{ marginTop: '0.75rem', paddingLeft: '1rem', borderLeft: '2px solid var(--border-color)' }}>
                        {sub.modules.slice(0, 3).map((m, mIdx) => (
                          <div key={mIdx} style={{ fontSize: '0.85rem', margin: '0.4rem 0' }}>
                            🏁 <strong>{m.title}</strong> — {m.description}
                          </div>
                        ))}
                        {sub.modules.length > 3 && (
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                            and {sub.modules.length - 3} more days...
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManagerPanel;
