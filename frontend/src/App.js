import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './components/Navbar';
import ProductList from './components/ProductList';
import Recommendations from './components/Recommendations';
import Footer from './components/Footer';
import Cart from './components/Cart';
import Login from './components/Login';
import Signup from './components/Signup';
import { Toast, ToastContainer } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastVariant, setToastVariant] = useState('success');

  useEffect(() => {
    axios.get(https://etech-efkd.onrender.com/api/products/products')
      .then(response => setProducts(response.data));
    axios.get('http://localhost:5000/api/products/products')
      .then(response => setRecommendations(response.data));
  }, []);

  const handleAddToCart = (item) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(i => i.id === item.id);
      if (existingItem) {
        if (existingItem.quantity >= item.stock) {
          setToastMessage('Maximum stock limit reached!');
          setToastVariant('danger');
          setShowToast(true);
          return prevItems;
        }
        setToastMessage('Item quantity updated in cart!');
        setToastVariant('success');
        setShowToast(true);
        return prevItems.map(i =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      setToastMessage('Item added to cart successfully!');
      setToastVariant('success');
      setShowToast(true);
      return [...prevItems, { ...item, quantity: 1 }];
    });
  };

  const handleViewCart = () => {
    window.location.href = '/cart';
  };

  const handleUpdateQuantity = (itemId, newQuantity) => {
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === itemId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(prevItems =>
      prevItems.filter(item => item.id !== itemId)
    );
  };

  return (
    <Router>
      <Navbar cartItems={cartItems} onViewCart={handleViewCart} />
      <div className="container">
        <Routes>
          <Route path="/" element={
            <div className="home-page">
              <div className="recommendations-section">
                <Recommendations 
                  recommendations={recommendations}
                  onAddToCart={handleAddToCart}
                />
              </div>
              <div className="products-section">
                <h3>Top Selling Products</h3>
                <ProductList 
                  products={products} 
                  onAddToCart={handleAddToCart}
                />
              </div>
              <div className="products-section1">
                <h3>You may also like</h3>
                <ProductList 
                  products={products} 
                  onAddToCart={handleAddToCart}
                />
              </div>
            </div>
          } />
          <Route 
            path="/cart" 
            element={
              <Cart 
                cartItems={cartItems}
                onUpdateQuantity={handleUpdateQuantity}
                onRemoveItem={handleRemoveItem}
              />
            } 
          />
          <Route 
            path="/products" 
            element={
              <div className="products-section">
                <h3>All Products</h3>
                <ProductList 
                  products={products} 
                  onAddToCart={handleAddToCart}
                />
              </div>
            } 
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
      <Footer />
      <ToastContainer position="top-end" className="p-3">
        <Toast 
          show={showToast} 
          onClose={() => setShowToast(false)} 
          delay={3000} 
          autohide
          bg={toastVariant}
        >
          <Toast.Header>
            <strong className="me-auto">
              {toastVariant === 'success' ? 'Success!' : 'Error!'}
            </strong>
          </Toast.Header>
          <Toast.Body className={toastVariant === 'success' ? 'text-white' : ''}>
            {toastMessage}
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Router>
  );
}

export default App;
