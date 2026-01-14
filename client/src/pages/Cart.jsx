import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
  const navigate = useNavigate();
  const { cart, updateCartItem, removeFromCart, clearCart } = useCart();

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    await updateCartItem(itemId, newQuantity);
  };

  const handleRemoveItem = async (itemId) => {
    if (window.confirm('Remove this item from cart?')) {
      await removeFromCart(itemId);
    }
  };

  const handleClearCart = async () => {
    if (window.confirm('Clear all items from cart?')) {
      await clearCart();
    }
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (!cart || cart.items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-container">
          <h1>Shopping Cart</h1>
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Add some items to get started!</p>
            <button className="btn-primary" onClick={() => navigate('/buy-now')}>
              Browse Products
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <button className="btn-clear" onClick={handleClearCart}>
            Clear Cart
          </button>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {cart.items.map((item) => (
              <div key={item._id} className="cart-item">
                <div className="item-image">
                  <img
                    src={item.product?.images?.[0] ? `/uploads/${item.product.images[0]}` : '/placeholder.jpg'}
                    alt={item.product?.title || 'Product'}
                  />
                </div>
                <div className="item-details">
                  <h3>{item.product?.title || 'Product'}</h3>
                  <p className="item-price">${item.price.toFixed(2)}</p>
                </div>
                <div className="item-quantity">
                  <button
                    className="qty-btn"
                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                  >
                    -
                  </button>
                  <span className="qty-value">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <div className="item-total">
                  <p>${(item.price * item.quantity).toFixed(2)}</p>
                </div>
                <button
                  className="btn-remove"
                  onClick={() => handleRemoveItem(item._id)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Order Summary</h2>
            <div className="summary-row">
              <span>Subtotal ({cart.items.length} items)</span>
              <span>${cart.totalAmount.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>FREE</span>
            </div>
            <div className="summary-row total">
              <span>Total</span>
              <span>${cart.totalAmount.toFixed(2)}</span>
            </div>
            <button className="btn-checkout" onClick={handleCheckout}>
              Proceed to Checkout
            </button>
            <button className="btn-continue" onClick={() => navigate('/buy-now')}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

