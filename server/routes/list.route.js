const controller = require("../controllers/list.controller");
const express = require("express");
const router = express.Router();
const authenticateToken = require("./authenticate.route");

router.get("/view/:userId", authenticateToken, controller.viewList);
router.post("/create-list", authenticateToken, controller.createList);

module.exports = router;