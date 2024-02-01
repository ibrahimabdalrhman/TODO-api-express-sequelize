const {User} = require('../models');
const asyncHandler = require("express-async-handler");


exports.addUser = asyncHandler(async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json({
    status: "success",
    user
  });
});

exports.getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.findAll();
  res.status(200).json({
    status: "success",
    result:users.length,
    users
  });
});

exports.getUser = asyncHandler(async (req, res) => {
  const user = await User.findByPk(req.params.id);
  res.status(200).json({
    status: "success",
    user
  });
});