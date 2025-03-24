const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization');

    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password'); // Exclude password from response

    if (!req.user) {
      return res.status(401).json({ message: 'Invalid token. User not found.' });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = auth;
