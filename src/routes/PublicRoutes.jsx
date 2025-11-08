import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Aboutus from "../pages/Aboutus";
import Contactus from "../pages/Contactus";
import NotFound from "../pages/NotFound"; // Import the 404 component
import Layout from "../layouts/layout";


export default function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/contactUs" element={<Contactus />} />
        
        {/* Add a catch-all route for 404 errors */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}