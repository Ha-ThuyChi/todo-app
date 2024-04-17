const controller = require("../controllers/task.controller");
const express = require("express");
const router = express.Router();
const authenticateToken = require("./authenticate.route");

router.use(authenticateToken);

router.get("/view/:listId", controller.viewTask);
router.post("/assign-task", controller.assignTask);
router.put("/delete-assignee/:taskId", controller.deleteAssignee);
router.post("/create-task", controller.createTask);
router.put("/update-task-status", controller.updateTaskStatus);

module.exports = router;