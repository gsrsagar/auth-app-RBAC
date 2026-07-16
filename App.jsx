import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Guards
import ProtectedRoute from './guards/ProtectedRoute';
import RoleGuard from './guards/RoleGuard';

// Components
import Navbar from './components/Navbar';

// Pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminPanel from './pages/AdminPanel';
import ManagerPanel from './pages/ManagerPanel';
import HRPanel from './pages/HRPanel';
import Unauthorized from './pages/Unauthorized';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />

            {/* General Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            {/* Role-Protected Routes */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <RoleGuard allowedRoles={['ADMIN']}>
                    <AdminPanel />
                  </RoleGuard>
                </ProtectedRoute>
              }
            />

            <Route
              path="/manager"
              element={
                <ProtectedRoute>
                  <RoleGuard allowedRoles={['MANAGER', 'ADMIN']}>
                    <ManagerPanel />
                  </RoleGuard>
                </ProtectedRoute>
              }
            />

            <Route
              path="/hr"
              element={
                <ProtectedRoute>
                  <RoleGuard allowedRoles={['HR', 'ADMIN']}>
                    <HRPanel />
                  </RoleGuard>
                </ProtectedRoute>
              }
            />

            {/* Catch-all Fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}

export default App;
