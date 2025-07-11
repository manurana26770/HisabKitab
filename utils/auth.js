const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;

// Generate JWT token (expires in 24 hours)
const generateToken = (userId) => {
  if (!userId || typeof userId !== "string") {
    throw new Error("Invalid userId passed to generateToken");  // ✅ Debugging safeguard
  }
  
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "24h" });
};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Access Denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = { generateToken, verifyToken };
