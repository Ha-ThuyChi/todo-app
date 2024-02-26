const controller = require("../controllers/list.controller");
const express = require("express");
const router = express.Router();

router.get("/view", controller.viewList);

module.exports = router;