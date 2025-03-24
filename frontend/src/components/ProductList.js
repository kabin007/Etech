import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, Star, MessageCircle } from "lucide-react";
import ProductCard from "./ProductCard";
import { Modal } from "react-bootstrap";

const ProductList = ({ products, onAddToCart }) => {
  const [liked, setLiked] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Toggle like state for a product
  const handleLike = (productId) => {
    setLiked((prev) => ({ ...prev, [productId]: !prev[productId] }));
  };

  // Open modal with selected product
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  // Close modal
  const handleClose = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="row">
      {products.map((product) => (
        <div key={product._id} className="col-md-4 mb-4">
          <div className="card product-card shadow-sm">
            <div style={{ height: "150px", overflow: "hidden", position: "relative" }}>
              {product.imageUrl ? (
                <img
                  src={product.imageUrl}
                  className="card-img-top"
                  alt={product.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : (
                <div 
                  style={{ 
                    width: "100%", 
                    height: "100%", 
                    backgroundColor: "#f8f9fa",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <span className="text-muted">No image</span>
                </div>
              )}
            </div>
            <div className="card-body" style={{ padding: "0.75rem" }}>
              <h5 className="card-title" style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>{product.name}</h5>
              <p className="card-text" style={{ fontSize: "0.9rem", fontWeight: "bold", marginBottom: "0.5rem" }}>${product.price}</p>
              {/* Icons Row */}
              <div className="d-flex justify-content-between align-items-center mb-2">
                <button
                  className="btn btn-sm btn-outline-danger p-1"
                  onClick={() => handleLike(product._id)}
                >
                  <Heart
                    size={16}
                    color={liked[product._id] ? "red" : "gray"}
                    fill={liked[product._id] ? "red" : "none"}
                  />
                </button>
                <button className="btn btn-sm btn-outline-warning p-1">
                  <Star size={16} color="gold" />
                </button>
                <button className="btn btn-sm btn-outline-primary p-1">
                  <MessageCircle size={16} color="blue" />
                </button>
              </div>
              {/* View Details Button */}
              <button
                className="btn btn-sm btn-primary w-100"
                onClick={() => handleViewDetails(product)}
              >
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
      {/* Modal for ProductCard */}
      <Modal show={!!selectedProduct} onHide={handleClose} size="lg">
        {selectedProduct && (
          <ProductCard product={selectedProduct} show={true} onHide={handleClose} onAddToCart={onAddToCart} />
        )}
      </Modal>
    </div>
  );
};

export default ProductList;