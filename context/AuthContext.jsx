import { createContext, useContext, useState, useEffect } from 'react';
import axiosInstance from '../api/axiosInstance';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize and verify user session if token exists
  useEffect(() => {
    const token = localStorage.getItem('accessToken');

    if (token) {
      axiosInstance
        .get('/auth/me')
        .then((res) => {
          setUser(res.data);
        })
        .catch(() => {
          // Token is invalid/expired
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          setUser(null);
        })
        .finally(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  // Login handler
  const login = async (credentials) => {
    try {
      // Backend expects: { emailid, password }
      const { data } = await axiosInstance.post('/auth/login', credentials);

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      setUser(data.user);

      return data;
    } catch (error) {
      throw error;
    }
  };

  // Signup/Registration handler
  const signup = async (userData) => {
    try {
      // Backend signup expects: { username, emailid, age, role, password }
      const { data } = await axiosInstance.post('/auth/signup', userData);
      
      // Auto-login after successful registration
      return await login({
        emailid: userData.emailid,
        password: userData.password,
      });
    } catch (error) {
      throw error;
    }
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setUser(null);
    window.location.href = '/login';
  };

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
