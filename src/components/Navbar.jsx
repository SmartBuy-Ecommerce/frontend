// src/components/Navbar.jsx
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { logout as authLogout } from '../api/auth';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    authLogout(); // Remove auth token
    logout(); // Clear user from context
    navigate('/login'); // Redirect to login
  };

  return (
    <nav className="bg-gray-100 p-4 text-black flex gap-50">
      <h1 className='font-bold text-4xl'>ShopMind</h1>
      <ul className="flex gap-20 justify-center items-center">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/aboutus">About</Link></li>
        <li><Link to="/contactUs">Contact</Link></li>
      </ul>
      {user ? (
        <button 
          onClick={handleLogout}
          className='bg-black text-white text-xl w-30 rounded-2xl ml-96 px-4 py-2'
        >
          Logout
        </button>
      ) : (
        <Link to="/login">
          <button className='bg-black text-white text-xl w-30 rounded-2xl ml-96 px-4 py-2'>
            Login
          </button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;