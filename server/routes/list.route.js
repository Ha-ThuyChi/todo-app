const controller = require("../controllers/list.controller");
const express = require("express");
const router = express.Router();
const authenticateToken = require("./authenticate.route");

router.get("/view/:userId", authenticateToken, controller.viewList);

module.exports = router;