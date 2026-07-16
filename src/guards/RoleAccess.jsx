import { useAuth } from "../context/AuthContext"



export const RoleAccess = ({ childrens, allowedRoles }) => {

    const { user } = useAuth();
    // USER , ['ADMIN', "SUPERADMIN"]
    // Check if user's role is in the allowed roles array
    if (!allowedRoles.includes(user?.role)) {
        // User doesn't have permission → redirect to 403 page
        return <Navigate to="/unauthorized" replace />;
    }
    // User has required role → render the page
    return children;
};
export default RoleAccess;
