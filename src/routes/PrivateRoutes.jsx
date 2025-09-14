import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound'; // Import the 404 component

export default function PrivateRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {user ? (
        <>
          <Route path="/dashboard" element={<Dashboard />} />
          {/* Add a catch-all route for 404 errors in private routes */}
          <Route path="*" element={<NotFound />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/login" />} />
      )}
    </Routes>
  );
}