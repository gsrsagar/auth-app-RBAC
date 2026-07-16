import { createContext } from "node:vm";
import { useState } from "react";
import { axiosInstance } from '../apis/axiosInstance'

export const AuthContext = createContext(null);


export const AuthProvider = ({ children, isRolesAvailable }) => {
    const [user, setuser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check if user is already logged in (token exists)
        const token = localStorage.getItem('accessToken');

        if (token) {
            // Token found — verify with backend and get user profile
            axiosInstance
                .get('/auth/me')

                .then((res) => {
                    // Success → Set user data from response
                    setUser(res.data);
                })
                .catch(() => {
                    // Failed → Token expired or invalid, clear everything
                    localStorage.clear();
                    setUser(null);
                })
                .finally(() => {
                    // Always stop loading regardless of outcome
                    setLoading(false);
                });
        } else {
            // No token found — user is not authenticated
            setLoading(false); // Stop loading immediately
        }
    }, []); // Empty dependency array = run once on mount


    const login = async (credentials) => {
        try {
            // POST credentials to backend
            const { data } = await axiosInstance.post('/auth/login', credentials);

            // Save tokens to localStorage
            localStorage.setItem('accessToken', data.accessToken);
            localStorage.setItem('refreshToken', data.refreshToken);

            // Set user state (triggers re-render of all consumers)
            setUser(data.user);

            return data; // Return for further use (navigation, etc.)
        } catch (error) {
            // Re-throw so Login page can handle errors
            throw error;
        }
    };



    // Clears all auth data and redirects
    const logout = async () => {
        // Remove all localStorage data
        const { data } = await axiosInstance.post('/auth/logout');
        localStorage.clear();

        // Clear user state
        setUser(null);

        // Hard redirect to login page
        // Using window.location for complete state cleanup
        window.location.href = '/login';
    };


    // Memoized to prevent unnecessary re-renders
    const value = {
        user, // { id, name, email, role, ... } or null
        login, // async function(credentials) => Promise
        logout, // function() => void
        loading, // boolean (true during initial auth check)
    };



    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}



export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
