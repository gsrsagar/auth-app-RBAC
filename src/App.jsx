import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import {ProtectedRoute} from './guards/ProtectedRoutes';
import {RoleAccess} from './guards/RoleAccess';
// Pages

// Components
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';
import Unauthorized from './components/UnAuthorized';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* ============ PUBLIC ROUTES ============ */}
            <Route path="/login" element={<Login />} />
            <Route path="/unauthorized" element={<Unauthorized />} />
            {/* ============ PROTECTED ROUTES (Auth required) ============ */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            {/* ============ ROLE-PROTECTED ROUTES (Auth + Role required) ============ */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute>
                  <RoleAccess allowedRoles={['ADMIN', 'SUPERADMIN']}>
                    <AdminPanel />
                  </RoleAccess>
                </ProtectedRoute>
              }
            />

            {/* ============ CATCH-ALL ROUTE ============ */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </Router>
    </AuthProvider>
  );
}
export default App;