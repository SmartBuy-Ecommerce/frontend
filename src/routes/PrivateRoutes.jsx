import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import SellerProducts from "../pages/seller/Products";
import AdminDashboard from "../pages/Admin/AdminDashboard";
import Orders from "../pages/Admin/Orders";
import NotFound from "../pages/NotFound";
import Layout from "../layouts/layout";
import Products from "../pages/Products";
export default function PrivateRoutes() {
  const { user } = useAuth();

  return (
    <Routes>
      {user ? (
        <Route element={<Layout />}>
          <Route index element={<Products/>}/>
          <Route path="seller/products" element={<SellerProducts />} />
          <Route path="admin/dashboard" element={<AdminDashboard />} />
          <Route path="admin/orders" element={<Orders />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      ) : (
        /* If not authenticated, any private route should go to login */
        <Route path="*" element={<Navigate to="/login" replace />} />
      )}
    </Routes>
  );
}
