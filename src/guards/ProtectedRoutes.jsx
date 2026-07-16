import { useAuth } from "../context/AuthContext"



export const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    // 1. Loading state — initial auth check not complete
    if (loading) {
        return (
            <div className="loading-spinner">
                <p>Loading...</p>
                {/* Replace with actual spinner component */}
            </div>
        );
    }
    // 2. Not authenticated — redirect to login
    if (!user) {
        return <Navigate to="/login" replace />; // false not loggedin 
    }
    // 3. Authenticated — render the protected content
    return children; // true
};