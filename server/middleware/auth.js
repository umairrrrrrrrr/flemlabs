const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'flemlabs_secret_jwt_key_998877';

const authMiddleware = (req, res, next) => {
  // Check auth header
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return res.status(401).json({ message: 'No authentication token, authorization denied.' });
  }

  const token = authHeader.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Token formatting error. Use Bearer <token>.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Contains id, name, email, role
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is invalid or expired.' });
  }
};

const adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied. Administrator privileges required.' });
  }
  next();
};

module.exports = {
  authMiddleware,
  adminMiddleware,
  JWT_SECRET
};
