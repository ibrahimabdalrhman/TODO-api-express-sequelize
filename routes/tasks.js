const express = require("express");
const router = express.Router();
const tasksService=require('../services/tasks')
const { auth } =require('../services/auth')

router.post("/",auth, tasksService.addTask);
router.get("/", auth, tasksService.AllTasks);
router.get("/:id", auth, tasksService.getTask);
router.patch("/:id", auth, tasksService.editTask);
router.delete("/:id", auth, tasksService.deleteTask);
router.patch("/:id/complete", auth, tasksService.complete);

module.exports = router;
