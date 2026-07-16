import { Link } from 'react-router-dom';


const Unauthorized = () => {
    return (
        <div className="unauthorized-container">
            <h1>403 - Unauthorized Access</h1>
            <div className="unauthorized-content">
                <p>You don't have permission to access this page.</p>
                <p>If you believe this is an error, please contact your administrator.</p>
            </div>
            <div className="unauthorized-actions">
                <Link to="/dashboard" className="btn-back">
                    Back to Dashboard
                </Link>
            </div>
        </div>
    );
};
export default Unauthorized;