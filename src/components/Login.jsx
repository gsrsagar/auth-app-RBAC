import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
/**
* Login Page
*
* Flow:
* 1. User fills email & password
* 2. On submit → calls AuthContext.login()
* 3. Success → navigate to /dashboard
* 4. Failure → show alert (can be enhanced with toast/error state)
*/
const Login = () => {

    const navigate = useNavigate();
    const { user } = useAuth();
    useEffect(() => {
        const token = localStorage.getItem("accessToken");
        if (token) {
            navigate("/dashboard");
        }
    }, [])
    // ---------- STATE ----------
    const [form, setForm] = useState({
        emailid: '',
        password: '',
    });

    const [error, setError] = useState(''); // For better error handling
    const [submitting, setSubmitting] = useState(false); // Loading state
    // ---------- HOOKS ----------
    const { login } = useAuth();


    // ---------- HANDLERS ----------
    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user starts typing
        if (error) setError('');
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        // Basic validation
        if (!form.emailid || !form.password) {
            setError('Please fill in all fields');
            return;
        }
        setSubmitting(true);
        setError('');
        try {
            // Attempt login
            await login(form);
            // Success — navigate to dashboard
            navigate('/dashboard');
        } catch (err) {
            // Handle different error scenarios
            if (err.response?.status === 401) {
                setError('Invalid email or password');
            } else if (err.response?.status === 429) {
                setError('Too many attempts. Please try again later.');
            } else {
                setError('Login failed. Please try again.');
            }
        } finally {
            setSubmitting(false);
        }
    }



    // ---------- RENDER ----------
    return (
        <div className="login-container">
            <h1>Login</h1>

            {error && <div className="error-message">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                        id="email"
                        name="emailid"
                        type="email"
                        placeholder="Enter your email"
                        value={form.email}
                        onChange={handleChange}
                        disabled={submitting}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Enter your password"
                        value={form.password}
                        onChange={handleChange}
                        disabled={submitting}
                        required
                    />
                </div>
                <button type="submit" disabled={submitting}>
                    {submitting ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </div>
    );
}

export default Login;