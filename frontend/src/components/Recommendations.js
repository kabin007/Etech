import React, { useState } from "react";
import { Carousel } from "react-bootstrap";
import ProductCard from "./ProductCard"; // Import ProductCard

const Recommendations = ({ recommendations, onAddToCart }) => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Handle "View Details" click
  const handleViewDetails = (product) => {
    setSelectedProduct(product);
  };

  // Close Modal
  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  return (
    <div className="mt-5">
      <h3>Recommended for You</h3>
      <Carousel>
        {recommendations.map((product) => (
          <Carousel.Item key={product._id} onClick={() => handleViewDetails(product)}>
            <img className="d-block w-100" src={product.imageUrl} alt={product.name} />
            <Carousel.Caption>
              <h5>{product.name}</h5>
              <p>${product.price}</p>
              <button className="btn btn-primary mt-2" onClick={() => handleViewDetails(product)}>
                View Details
              </button>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Render ProductCard as a Modal */}
      {selectedProduct && (
        <div className="modal d-block bg-dark bg-opacity-50">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedProduct.name}</h5>
                <button className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <ProductCard product={selectedProduct} onAddToCart={onAddToCart} />
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleCloseModal}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Recommendations;
