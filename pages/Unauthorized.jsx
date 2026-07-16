import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div className="error-page-container">
      <div className="error-badge">403</div>
      <h1 className="error-title">Access Denied</h1>
      <p className="error-desc">
        Your current role does not have permission to view this resource. 
        If you think this is a mistake, please contact a training administrator.
      </p>
      <Link to="/dashboard" className="btn btn-primary">
        Return to Dashboard
      </Link>
    </div>
  );
};

export default Unauthorized;
