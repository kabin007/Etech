const express = require('express');
const router = express.Router();
const UserBehavior = require('../models/UserBehavior');
const auth = require('../middleware/auth');

// Track product view
router.post('/track-view', auth, async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    let userBehavior = await UserBehavior.findOne({ userId });
    
    if (!userBehavior) {
      userBehavior = new UserBehavior({
        userId,
        viewedProducts: [productId]
      });
    } else {
      // Add product to viewed products if not already present
      if (!userBehavior.viewedProducts.includes(productId)) {
        userBehavior.viewedProducts.push(productId);
      }
      userBehavior.lastViewed = new Date();
    }

    await userBehavior.save();
    res.status(200).json({ message: 'View tracked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error tracking view', error: error.message });
  }
});

// Track add to cart
router.post('/track-cart', auth, async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.id;

    let userBehavior = await UserBehavior.findOne({ userId });
    
    if (!userBehavior) {
      userBehavior = new UserBehavior({
        userId,
        cartProducts: [productId]
      });
    } else {
      // Add product to cart products if not already present
      if (!userBehavior.cartProducts.includes(productId)) {
        userBehavior.cartProducts.push(productId);
      }
      userBehavior.lastViewed = new Date();
    }

    await userBehavior.save();
    res.status(200).json({ message: 'Cart action tracked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error tracking cart action', error: error.message });
  }
});

// Get user behavior data
router.get('/user-behavior', auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const userBehavior = await UserBehavior.findOne({ userId })
      .populate('viewedProducts')
      .populate('cartProducts')
      .populate('purchasedProducts');

    if (!userBehavior) {
      return res.status(404).json({ message: 'No behavior data found' });
    }

    res.status(200).json(userBehavior);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user behavior', error: error.message });
  }
});

module.exports = router; 