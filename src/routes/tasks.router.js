const express = require("express");
const router = express.Router();

const tasksController = require("../controllers/taskController");

// router.get("/all", tasksController.getAllTasks);
// router.get("/create", tasksController.getCreateTask);
router.post("/create", tasksController.postCreateTask);

// router.get("/edit/:id", tasksController.getEditTask);
// router.post("/edit/:id", tasksController.postEditBookById);
// router.post("/profile/delete", tasksController.deleteProfile);

module.exports = router;