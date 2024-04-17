const controller = require("../controllers/list.controller");
const express = require("express");
const router = express.Router();
const authenticateToken = require("./authenticate.route");

router.use(authenticateToken);

router.get("/view/:userId", controller.viewList);
router.post("/create-list", controller.createList);
router.delete("/delete-list/:listId", controller.deleteList);

module.exports = router;