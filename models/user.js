const { DataTypes } = require('sequelize');
const bcrypt = require("bcrypt");
const sequelize = require('../config/database');

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: {
        args: [8],
        msg: "Password must be at least 8 characters long",
      },
    },
  },
});

User.beforeCreate(async (user) => {
  const hashedPassord = await bcrypt.hash(user.password, 12);
  user.password = hashedPassord;
});

module.exports=User

