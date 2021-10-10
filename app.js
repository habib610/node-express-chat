const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const colors = require("colors");
const path = require("path");
const cookieParser = require("cookie-parser");
const {
  notFoundHandler,
  errorHandler,
} = require("./middlewares/common/errorHandler");
const loginRouter = require("./router/loginRouter");
const usersRouter = require("./router/usersRouter");
const inboxRouter = require("./router/inboxRouter");
dotenv.config();

const app = express();

// database connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(colors.bgGreen.bold("Database connected successfully"));
  }
});

// request parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// set ejs
app.set("view engine", "ejs");

// set static folder
app.use(express.static(path.join(__dirname, "/public")));

// cookie parser
app.use(cookieParser(process.env.COOKIE_SECRET));

// routing setup
app.use("/", loginRouter);
app.use("/users", usersRouter);
app.use("/inbox", inboxRouter);

// 404 not found error handler
app.use(notFoundHandler);

// common error handler
app.use(errorHandler);

app.listen(process.env.PORT, () =>
  console.log(
    colors.bgYellow.bold(`Server is running port ${process.env.PORT}`)
  )
);
