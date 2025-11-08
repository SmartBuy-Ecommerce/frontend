import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AdminDashboard from '../admin/AdminDashboard';
import AddProduct from '../admin/AddProduct';
import ManageOrders from '../admin/ManageOrders';

export default function AdminRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {user?.role === 'admin' ? (
        <>
          <Route path="/admin" element={<AdminDashboard />} />
        </>
      ) : (
        <Route path="*" element={<Navigate to="/" />} />
      )}
    </Routes>
  );
}
