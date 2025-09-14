import { Routes, Route, Navigate } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import { useAuth } from '../contexts/AuthContext';
import NotFound from '../pages/NotFound';

export default function AllRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/*" element={<PublicRoutes />} />
      
      {/* Private routes */}
      <Route path="/dashboard/*" element={
        user ? <PrivateRoutes /> : <Navigate to="/login" replace />
      } />
      
      {/* Catch-all 404 route - only reaches here if no other routes match */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}