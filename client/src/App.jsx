import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import AuctionList from './pages/AuctionList';
import AuctionDetail from './pages/AuctionDetail';
import CreateAuction from './pages/CreateAuction';
import Dashboard from './pages/Dashboard';
import MyAccount from './pages/MyAccount';
import SellItem from './pages/SellItem';
import Consignment from './pages/Consignment';
import BuyNow from './pages/BuyNow';
import Cart from './pages/Cart';
import PrivateRoute from './components/PrivateRoute';
import './App.css';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <div className="app">
              <Navbar />
              <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/auctions" element={<AuctionList />} />
                <Route path="/auctions/:id" element={<AuctionDetail />} />
                <Route
                  path="/create-auction"
                  element={
                    <PrivateRoute>
                      <CreateAuction />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/dashboard"
                  element={
                    <PrivateRoute>
                      <Dashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/my-account"
                  element={
                    <PrivateRoute>
                      <MyAccount />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/sell-item"
                  element={
                    <PrivateRoute>
                      <SellItem />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/consignment"
                  element={
                    <PrivateRoute>
                      <Consignment />
                    </PrivateRoute>
                  }
                />
                <Route path="/buy-now" element={<BuyNow />} />
                <Route
                  path="/cart"
                  element={
                    <PrivateRoute>
                      <Cart />
                    </PrivateRoute>
                  }
                />
              </Routes>
              <Footer />
          </main>
        </div>
      </Router>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

