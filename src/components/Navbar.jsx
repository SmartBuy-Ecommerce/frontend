// src/components/Navbar.jsx
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-100 p-4 text-black flex gap-50">
      <h1 className='font-bold text-4xl'>ShopMind</h1>
      <ul className="flex gap-20 justify-center items-center">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
      
      <button className='bg-black text-white text-xl w-30 rounded-2xl ml-96'><Link to="/login">Login</Link></button>
    </nav>
  );
};

export default Navbar;
