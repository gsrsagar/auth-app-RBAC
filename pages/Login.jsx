import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Form states
  const [loginForm, setLoginForm] = useState({
    emailid: '',
    password: '',
  });

  const [signupForm, setSignupForm] = useState({
    username: '',
    emailid: '',
    age: 25,
    role: 'USER',
    password: '',
  });

  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const handleSignupChange = (e) => {
    const { name, value } = e.target;
    setSignupForm((prev) => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value, 10) || 0 : value,
    }));
    if (error) setError('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!loginForm.emailid || !loginForm.password) {
      setError('Please fill in all credentials.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await login(loginForm);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      const msg = err.response?.data?.message || err.response?.data?.error || 'Failed to authenticate. Please check your credentials.';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    const { username, emailid, age, role, password } = signupForm;
    if (!username || !emailid || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    setSubmitting(true);
    setError('');

    try {
      await signup({
        username,
        emailid,
        age,
        role: role.toUpperCase(),
        password,
      });
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      const details = err.response?.data?.details;
      const msg = Array.isArray(details) ? details.join(' ') : (err.response?.data?.error || 'Registration failed.');
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-card">
        <div className="auth-header">
          <h1>ByteSplash Portal</h1>
          <p>{isLoginTab ? 'Access your training dashboard' : 'Join the training center'}</p>
        </div>

        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab-btn ${isLoginTab ? 'active' : ''}`}
            onClick={() => {
              setIsLoginTab(true);
              setError('');
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab-btn ${!isLoginTab ? 'active' : ''}`}
            onClick={() => {
              setIsLoginTab(false);
              setError('');
            }}
          >
            Register
          </button>
        </div>

        {error && (
          <div className="error-banner">
            <svg style={{ width: '20px', height: '20px' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {isLoginTab ? (
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label htmlFor="login-email">Email Address</label>
              <input
                id="login-email"
                name="emailid"
                type="email"
                placeholder="you@bytesplash.in"
                className="form-input"
                value={loginForm.emailid}
                onChange={handleLoginChange}
                disabled={submitting}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="login-password">Password</label>
              <input
                id="login-password"
                name="password"
                type="password"
                placeholder="Enter password"
                className="form-input"
                value={loginForm.password}
                onChange={handleLoginChange}
                disabled={submitting}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={submitting}>
              {submitting ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit}>
            <div className="form-group">
              <label htmlFor="signup-username">Username</label>
              <input
                id="signup-username"
                name="username"
                type="text"
                placeholder="johndoe"
                className="form-input"
                value={signupForm.username}
                onChange={handleSignupChange}
                disabled={submitting}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="signup-email">Email Address</label>
              <input
                id="signup-email"
                name="emailid"
                type="email"
                placeholder="johndoe@bytesplash.in"
                className="form-input"
                value={signupForm.emailid}
                onChange={handleSignupChange}
                disabled={submitting}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div className="form-group" style={{ flex: 1 }}>
                <label htmlFor="signup-age">Age</label>
                <input
                  id="signup-age"
                  name="age"
                  type="number"
                  placeholder="25"
                  className="form-input"
                  value={signupForm.age}
                  onChange={handleSignupChange}
                  disabled={submitting}
                  min="1"
                  required
                />
              </div>

              <div className="form-group" style={{ flex: 1.5 }}>
                <label htmlFor="signup-role">Assigned Role</label>
                <select
                  id="signup-role"
                  name="role"
                  className="form-input form-select"
                  value={signupForm.role}
                  onChange={handleSignupChange}
                  disabled={submitting}
                >
                  <option value="USER">User (Student)</option>
                  <option value="MANAGER">Manager (Instructor)</option>
                  <option value="HR">HR Officer</option>
                  <option value="ADMIN">System Admin</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="signup-password">Password</label>
              <input
                id="signup-password"
                name="password"
                type="password"
                placeholder="Choose password"
                className="form-input"
                value={signupForm.password}
                onChange={handleSignupChange}
                disabled={submitting}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} disabled={submitting}>
              {submitting ? 'Creating Account...' : 'Register & Log In'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;
