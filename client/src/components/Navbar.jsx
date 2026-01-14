import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { getCartCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Top Bar */}
      <div className="top-bar">
        <div className="top-bar-container">
          <div className="top-bar-right">
            <button className="icon-btn" title="Search">
              <span className="search-icon">🔍</span>
            </button>
            <button className="icon-btn" title="Favorites">
              <span className="star-icon">⭐</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="navbar">
        <div className="navbar-container">
          <Link to="/" className="navbar-logo">
            <span className="logo-icon">🔨</span>
            <span className="logo-text">Auction Planet</span>
          </Link>

          <ul className="navbar-menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/auctions">Auctions</Link></li>
            <li><Link to="/buy-now">Buy Now</Link></li>
            <li><Link to="/sell-item">Sell Item</Link></li>
            <li><Link to="/consignment">Consignment</Link></li>
            <li><Link to="/my-account">My Account</Link></li>
          </ul>

          <div className="navbar-right">
            {isAuthenticated ? (
              <>
                <Link to="/cart" className="cart-btn" title="Shopping Cart">
                  <span className="cart-icon">🛒</span>
                  {getCartCount() > 0 && (
                    <span className="cart-count">{getCartCount()}</span>
                  )}
                </Link>
                <span className="user-email">{user?.email}</span>
                <button onClick={handleLogout} className="logout-btn">
                  <span className="logout-icon">🚪</span>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="nav-link">Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

