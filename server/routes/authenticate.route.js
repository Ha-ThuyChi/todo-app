const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // take the token from the headers("Bearer ...")
    if (!token) {
      return res.status(401).send("No token.")
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        // if (err.name === "JsonWebTokenError") {
        //   return res.status(403).send("Invalid token.");
        // };
        if (err.name === "TokenExpiredError") {
          res.status(401).send("Token expired.")
        }
      } else {
        next();
      }
  });
};

module.exports = authenticateToken;