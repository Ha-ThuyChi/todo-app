const controller = require("../controllers/task.controller");
const express = require("express");
const router = express.Router();
const authenticateToken = require("./authenticate.route");

router.use(authenticateToken);

router.get("/view/:listId", controller.viewTask);

module.exports = router;