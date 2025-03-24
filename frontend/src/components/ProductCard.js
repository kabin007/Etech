import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { FaStar, FaShoppingCart, FaTimes, FaHeart, FaUser } from 'react-icons/fa';
import { trackProductView, trackAddToCart } from '../services/userBehaviorService';
import './ProductCard.css';

const ProductCard = ({ product, onHide, show, onAddToCart }) => {
  const {
    id,
    name,
    price,
    imageUrl,
    rating,
    stock,
    description,
    category,
    numReviews,
    reviews
  } = product;
  
  // Function to render star ratings
  const renderStars = (ratingValue) => {
    return [...Array(5)].map((_, index) => (
      <FaStar 
        key={index} 
        className={index < Math.floor(ratingValue) ? 'star-filled' : 'star-empty'} 
      />
    ));
  };

  const handleAddToCart = () => {
    onAddToCart({
      id: product.id,
      name,
      price,
      imageUrl,
      stock,
      quantity: 1
    });
    // Track add to cart behavior
    trackAddToCart(id);
  };

  // Track product view when component mounts
  React.useEffect(() => {
    if (show) {
      trackProductView(id);
    }
  }, [show, id]);

  return (
    <Card className={`product-card-detailed ${show ? 'show' : ''}`}>
      {onHide && (
        <Button 
          variant="light" 
          className="close-button" 
          onClick={onHide}
        >
          <FaTimes />
        </Button>
      )}
      
      <div className="product-card-content">
        <div className="product-image-container">
          <Card.Img
            variant="top"
            src={imageUrl}
            alt={name}
            className="product-image-detailed"
          />
          <Badge 
            pill 
            className="product-category-badge"
            bg="primary"
          >
            {category}
          </Badge>
          
          {stock <= 5 && stock > 0 && (
            <Badge pill className="limited-stock-badge" bg="warning">
              Only {stock} left!
            </Badge>
          )}
        </div>
        
        <Card.Body className="product-details">
          <div className="product-header">
            <Card.Title className="product-title">{name}</Card.Title>
            <Button variant="outline-danger" className="wishlist-btn">
              <FaHeart />
            </Button>
          </div>
          
          <div className="product-rating-container">
            <div className="product-rating">
              {renderStars(rating)}
              <span className="rating-value">({rating})</span>
            </div>
            <div className="review-count">
              {numReviews} {numReviews === 1 ? 'Review' : 'Reviews'}
            </div>
          </div>
          
          <Card.Text className="product-description">
            {description}
          </Card.Text>
          
          <div className="product-price-container">
            <div className="product-price">
              <span className="price-label">$</span>
              <span className="price-value">{price.toFixed(2)}</span>
            </div>
            <div className="product-stock">
              <span className={`stock-status ${stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
                {stock > 0 ? `In Stock (${stock})` : 'Out of Stock'}
              </span>
            </div>
          </div>
          
          <div className="reviews-section">
            <h5 className="reviews-title">Customer Reviews</h5>
            {reviews && reviews.map((review, index) => (
              <div key={index} className="review-item">
                <div className="review-header">
                  <div className="reviewer-info">
                    <FaUser className="user-icon" />
                    <span className="reviewer-name">{review.name}</span>
                  </div>
                  <div className="review-rating">
                    {renderStars(review.rating)}
                    <span className="rating-text">{review.rating}</span>
                  </div>
                </div>
                <p className="review-comment">{review.comment}</p>
              </div>
            ))}
          </div>
          
          <div className="product-actions">
            <Button
              variant="primary"
              className="add-to-cart-btn"
              disabled={stock === 0}
              onClick={handleAddToCart}
            >
              <FaShoppingCart className="cart-icon" />
              Add to Cart
            </Button>
          </div>
        </Card.Body>
      </div>
    </Card>
  );
};

export default ProductCard;