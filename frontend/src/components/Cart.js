import React from 'react';
import { Modal, Button, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaTimes, FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import './Cart.css';

const Cart = ({ show, onHide, cartItems, onUpdateQuantity, onRemoveItem }) => {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
      className="cart-modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          <FaShoppingCart className="cart-icon" />
          Shopping Cart
          <Badge bg="primary" className="cart-count">
            {itemCount}
          </Badge>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cartItems.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <Button variant="primary" onClick={onHide}>
              Continue Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-item">
                  <div className="cart-item-image">
                    <img src={item.imageUrl} alt={item.name} />
                    <Badge 
                      pill 
                      className="quantity-badge"
                      bg="primary"
                    >
                      {item.quantity}
                    </Badge>
                  </div>
                  
                  <div className="cart-item-details">
                    <h5 className="cart-item-name">{item.name}</h5>
                    <div className="cart-item-price">
                      <span className="price-label">$</span>
                      <span className="price-value">{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    
                    <div className="quantity-controls">
                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                      >
                        <FaMinus />
                      </Button>
                      <span className="quantity-display">{item.quantity}</span>
                      <Button 
                        variant="outline-secondary" 
                        size="sm"
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.stock}
                      >
                        <FaPlus />
                      </Button>
                    </div>
                  </div>
                  
                  <Button 
                    variant="outline-danger" 
                    className="remove-item-btn"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <FaTrash />
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="cart-summary">
              <div className="total-section">
                <span>Total:</span>
                <span className="total-amount">${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="cart-actions">
                <Button variant="outline-secondary" onClick={onHide}>
                  Continue Shopping
                </Button>
                <Button variant="primary">
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default Cart; 