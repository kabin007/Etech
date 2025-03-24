import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { FaTrash, FaPlus, FaMinus } from 'react-icons/fa';
import './CartItem.css';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  const { id, name, price, imageUrl, quantity, stock } = item;

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity > 0 && newQuantity <= stock) {
      onUpdateQuantity(id, newQuantity);
    }
  };

  return (
    <Card className="cart-item">
      <div className="cart-item-content">
        <div className="cart-item-image">
          <img src={imageUrl} alt={name} />
          <Badge 
            pill 
            className="quantity-badge"
            bg="primary"
          >
            {quantity}
          </Badge>
        </div>
        
        <div className="cart-item-details">
          <h5 className="cart-item-name">{name}</h5>
          <div className="cart-item-price">
            <span className="price-label">$</span>
            <span className="price-value">{(price * quantity).toFixed(2)}</span>
          </div>
          
          <div className="quantity-controls">
            <Button 
              variant="outline-secondary" 
              size="sm"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              <FaMinus />
            </Button>
            <span className="quantity-display">{quantity}</span>
            <Button 
              variant="outline-secondary" 
              size="sm"
              onClick={() => handleQuantityChange(1)}
              disabled={quantity >= stock}
            >
              <FaPlus />
            </Button>
          </div>
        </div>
        
        <Button 
          variant="outline-danger" 
          className="remove-item-btn"
          onClick={() => onRemove(id)}
        >
          <FaTrash />
        </Button>
      </div>
    </Card>
  );
};

export default CartItem; 