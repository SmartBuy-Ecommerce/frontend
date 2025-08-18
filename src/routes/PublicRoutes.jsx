import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Shop from "../pages/Shop";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProductDetails from "../pages/ProductDetails";
import Dashboard from "../pages/Dashboard";
import Layout from "../layouts/layout";

export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/Dashboard" element={<Dashboard/>}/>
      </Route>
    </Routes>
  );
} 
