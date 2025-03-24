const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const UserBehavior = require('../models/UserBehavior');

// Get recommendations for a user
router.get('/recommendations/:userId', async (req, res) => {
  try {
    const userBehavior = await UserBehavior.findOne({ userId: req.params.userId });
    if (!userBehavior) {
      return res.json([]);
    }

    // Get products that user hasn't viewed or added to cart
    const viewedAndCartProducts = [...userBehavior.viewedProducts, ...userBehavior.cartProducts];
    const recommendations = await Product.find({
      _id: { $nin: viewedAndCartProducts }
    })
    .sort({ rating: -1 })
    .limit(10);

    res.json(recommendations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get popular recommendations
router.get('/recommendations/popular', async (req, res) => {
  try {
    const popularProducts = await Product.find({})
      .sort({ rating: -1, numReviews: -1 })
      .limit(10);
    res.json(popularProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Track user behavior
router.post('/recommendations/track', async (req, res) => {
  try {
    const { userId, productId, action } = req.body;
    
    let userBehavior = await UserBehavior.findOne({ userId });
    if (!userBehavior) {
      userBehavior = new UserBehavior({ userId });
    }

    switch (action) {
      case 'view':
        if (!userBehavior.viewedProducts.includes(productId)) {
          userBehavior.viewedProducts.push(productId);
        }
        break;
      case 'cart':
        if (!userBehavior.cartProducts.includes(productId)) {
          userBehavior.cartProducts.push(productId);
        }
        break;
      case 'purchase':
        if (!userBehavior.purchasedProducts.includes(productId)) {
          userBehavior.purchasedProducts.push(productId);
        }
        break;
    }

    userBehavior.lastViewed = new Date();
    await userBehavior.save();
    res.json(userBehavior);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;