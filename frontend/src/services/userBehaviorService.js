import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const trackProductView = async (productId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return;

    await axios.post(
      `${API_URL}/user-behavior/track-view`,
      { productId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  } catch (error) {
    console.error('Error tracking product view:', error);
  }
};

export const trackAddToCart = async (productId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return;

    await axios.post(
      `${API_URL}/user-behavior/track-cart`,
      { productId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  } catch (error) {
    console.error('Error tracking cart action:', error);
  }
};

export const getUserBehavior = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) return null;

    const response = await axios.get(`${API_URL}/user-behavior/user-behavior`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user behavior:', error);
    return null;
  }
}; 