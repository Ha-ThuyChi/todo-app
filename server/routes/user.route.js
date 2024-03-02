const controller = require("../controllers/user.controller");
const express = require("express");
const router = express.Router();

router.post("/create-user", controller.createUser);
router.post("/get-user", controller.getUser);

module.exports = router;