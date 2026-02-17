import { useCart } from '../context/CartContext';
import './ShoppingCart.css';

const ShoppingCart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotal, getTotalItems, clearCart } = useCart();

  const handlePayment = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert('Payment successful! 🎉\nThank you for your purchase!');
    clearCart();
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <div className="empty-icon">🛒</div>
        <h2>Your Cart is Empty</h2>
        <p>Browse courses and add them to your cart!</p>
      </div>
    );
  }

  const subtotal = getTotal();
  const discount = 0;
  const total = subtotal - discount;

  return (
    <div className="shopping-cart">
      <div className="cart-header">
        <h1>🛒 Shopping Cart</h1>
        <p>{getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'} in your cart</p>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <div className="item-icon">{item.image}</div>
              <div className="item-details">
                <h3>{item.name}</h3>
                <p className="item-instructor">👨‍🏫 {item.instructor}</p>
                <p className="item-duration">⏱️ {item.duration}</p>
              </div>
              <div className="item-quantity">
                <span className="qty-display">1</span>
              </div>
              <div className="item-price">
                <div className="price-total">₹{item.price.toLocaleString()}</div>
                <div className="price-unit">₹{item.price.toLocaleString()} each</div>
              </div>
              <button
                className="remove-btn"
                onClick={() => removeFromCart(item.id)}
                title="Remove from cart"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="summary-row">
            <span>Subtotal ({getTotalItems()} {getTotalItems() === 1 ? 'item' : 'items'})</span>
            <span>₹{subtotal.toLocaleString()}.00</span>
          </div>
          <div className="summary-row">
            <span>Discount</span>
            <span>-₹{discount.toLocaleString()}.00</span>
          </div>
          <div className="summary-divider"></div>
          <div className="summary-row total">
            <span>Total Amount</span>
            <span>₹{total.toLocaleString()}.00</span>
          </div>
          <button className="payment-btn" onClick={handlePayment}>
            💳 Proceed to Payment
          </button>
          {discount > 0 && (
            <div className="savings-badge">
              🎉 You will save ₹{discount.toLocaleString()} on this order
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
