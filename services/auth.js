const { User } = require("../models");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ApiError = require("../utils/ApiError");

const createToken = (payload) =>
  jwt.sign({ UserId: payload }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

exports.signup = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  const user = await User.create({ name, email, password });
  const token = createToken(user.id);
  res.status(201).json({
    status: "success",
    user,
    token,
  });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email: email } });
  if (!user) {
    res.status(400).json({
      msg: "incorrect email or password",
    });
  }
  const correctPass = await bcrypt.compare(req.body.password, user.password);
  if (!correctPass) {
    res.status(400).json({
      msg: "incorrect email or password",
    });
  }
  const token = createToken(user.id);
  res.status(201).json({
    status: "success",
    user,
    token,
  });
});

exports.auth = asyncHandler(async (req, res, next) => {
  if (!req.headers.authorization) {
    return next(new ApiError("you must login to access this route ", 401));
  }
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return next(new ApiError("you must login to access this route ", 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    // Check whether the decoded UserId is stored in the database.
    const currentUser = await User.findByPk(decoded.UserId);
    if (!currentUser) {
      return next(new ApiError("you must login to access this route ", 401));
    }
    req.user = currentUser;
    next();
  } catch (err) {
    if (err instanceof jwt.JsonWebTokenError) {
      return next(new ApiError("you must login to access this route ", 401));
    }
    next(err);
  }
});


