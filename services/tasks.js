const { Task } = require("../models");
const asyncHandler = require("express-async-handler");

exports.addTask = asyncHandler(async (req, res, next) => {
  console.log(req.user.id);
  req.body.UserId = req.user.id;
  const task = await Task.create(req.body);
  res.status(201).json({
    status: true,
    task,
  });
});

exports.AllTasks = asyncHandler(async (req, res, next) => {
  const tasks = await Task.findAll({ where: { UserId: req.user.id } });
  res.status(200).json({
    status: true,
    length: tasks.length,
    tasks,
  });
});

exports.getTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findByPk(req.params.id, {
    where: { UserId: req.user.id },
  });
  res.status(200).json({
    status: true,
    task,
  });
});

exports.editTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findByPk(req.params.id, {
    where: { UserId: req.user.id },
  });
  const { title, description, startDate, endDate } = req.body;
  task.title = title || task.title;
  task.description = description || task.any;
  task.startDate = startDate || task.startDate;
  task.endDate = endDate || task.endDate;
  await task.save();
  res.status(200).json({
    status: true,
    task,
  });
});

exports.deleteTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findByPk(req.params.id, {
    where: { UserId: req.user.id },
  });
  await task.destroy();
  res.status(200).json({
    status: true,
    msg: `task deleted`,
  });
});

exports.complete = asyncHandler(async (req, res, next) => {
  const task = await Task.findByPk(req.params.id,{
    where: { UserId: req.user.id },
  });
  task.complete = task.complete ? false : true;
  await task.save();
  res.status(200).json({
    status: true,
    task,
  });
});
