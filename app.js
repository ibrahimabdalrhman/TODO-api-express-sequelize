const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: 'config.env' });
const userRoute = require('./routes/user');
const authRoute = require('./routes/auth');
const tasksRoute = require('./routes/tasks');
const ApiError = require("./utils/ApiError");
const errorMiddleware = require("./middlewares/errorMiddleware");

app.use(express.json());

app.use("/api/v1/tasks", tasksRoute);
app.use('/api/v1/users', userRoute);
app.use("/api/v1/auth", authRoute);



app.use("*", (req, res, next) => {
  return next(new ApiError("can't find this page", 404));
});

app.use(errorMiddleware);

const port=process.env.PORT
app.listen(port, () => {
  console.log(`server running on port ${port}`);
})