import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Dashboard from "../pages/Dashboard";
import AdminProducts from "../pages/seller/Products";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import NotFound from "../pages/NotFound";
import Layout from "../layouts/layout";
export default function PrivateRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {user ? (
        <Route element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="seller/products" element={<AdminProducts />} />
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      ) : (
        /* If not authenticated, any private route should go to login */
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
}
