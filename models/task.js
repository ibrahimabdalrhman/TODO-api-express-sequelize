const { DataTypes, literal } = require("sequelize");
const sequelize = require("../config/database");
const ApiError = require("../utils/ApiError");

const Task = sequelize.define("Task", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  startDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: true,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  complete: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});

Task.beforeCreate((task) => {
  if (task.endDate < task.startDate) {
    throw new ApiError("endDate must be greater than startDate", 401);
  }
  if (task.endDate < Date.now()) {
    throw new ApiError("endDate must be greater than startDate", 401);
  }
});

module.exports = Task;
