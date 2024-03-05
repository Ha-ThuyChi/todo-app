const controller = require("../controllers/list.controller");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const authenticatToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // take the token from the headers("Bearer ...")
    if (!token) {
      return res.status(401).send("No token.")
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
          console.error(err);
          if (err.name === "JsonWebTokenError") {
              return res.status(403).send("Invalid token")
          };
      } else {
          next();
      }
  });
}
router.get("/view", authenticatToken, controller.viewList);

module.exports = router;