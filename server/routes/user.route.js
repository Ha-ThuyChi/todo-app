const controller = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();
const authenticateToken = require("./authenticate.route");

router.post("/create-user", controller.createUser);
router.post("/get-user", controller.getUserByEmail);
router.get("/get-user-by-id/:userId", authenticateToken, controller.getUserById);

module.exports = router;