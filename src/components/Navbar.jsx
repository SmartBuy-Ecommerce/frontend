import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useCart } from "../contexts/CartContext";
import { logout as authLogout } from "../api/auth";
import { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const handleLogout = () => {
    authLogout();
    logout();
    setTimeout(() => navigate("/"), 0); // defer navigation to next tick
  };

  useEffect(() => {
    if (!user) navigate("/");
  }, [user, navigate]);

  return (
    <nav className="bg-gray-100 p-4 text-black flex gap-30">
      <h1 className="font-bold text-4xl">ShopMind</h1>
      <ul className="flex gap-20 justify-center items-center">
        {user?.role ? (
          <li>
            {(() => {
              switch (user.role) {
                case "SELLER":
                  return <Link to="/dashboard/seller/products">Home</Link>;
                case "ADMIN":
                  return <Link to="/dashboard/admin/dashboard">Home</Link>;
                default:
                  return <Link to="/">Home</Link>;
              }
            })()}
          </li>
        ) : (
          <li>
            <Link to="/">Home</Link>
          </li>
        )}

        {user?.role === "BUYER" ? (
          <li>
            <Link to="/dashboard">Products</Link>
          </li>
        ) : null}
        {user?.role === "ADMIN" ? null : (
          <li>
            <Link to="/aboutus">About</Link>
          </li>
        )}
        {user?.role === "ADMIN" ? (
          <li>
            <Link to="/dashboard/admin/orders">Orders</Link>
          </li>
        ) : (
          <li>
            <Link to="/contactUs">Contact</Link>
          </li>
        )}

        {user?.role === "BUYER" ? (
          <li>
            <Link to="/dashboard/cart">
              {" "}
              <div className="relative inline-block">
                <FontAwesomeIcon icon={faShoppingCart} size="lg" />

                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-3 bg-red-600 text-white text-xs px-1 py-0 rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            </Link>
          </li>
        ) : null}
      </ul>

      {user ? (
        <button
          onClick={handleLogout}
          className="bg-black text-white text-xl w-30 rounded-2xl ml-96 px-4 py-2"
        >
          Logout
        </button>
      ) : (
        <Link to="/login">
          <button className="bg-black text-white text-xl w-30 rounded-2xl ml-96 px-4 py-2">
            Login
          </button>
        </Link>
      )}
    </nav>
  );
};

export default Navbar;
