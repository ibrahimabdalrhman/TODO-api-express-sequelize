const User = require("./user");
const Task = require("./task");
const db = require("../config/database");

User.hasMany(Task, { as: "task" });
Task.belongsTo(User);

db.sync({ force: false }).then(() => {
  console.log("Tables Created!");
});

module.exports = {
  User,
  Task,
};
