// src/components/Layout.jsx
import Navbar from '../components/Navbar';
import { Outlet,useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();

  const noNavbarPaths = ['/login', '/register'];
  const shouldShowNavbar = !noNavbarPaths.includes(location.pathname);
  return (
    <>
      {shouldShowNavbar && <Navbar /> }
      <div className="p-4">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
