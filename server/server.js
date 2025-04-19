const express = require("express");
require("dotenv").config();
const cors = require("cors");
const userRoutes = require("./v1/routes/userRoutes");
const userTaskRoutes = require("./v1/routes/userTaskRoutes");
const cookieParser = require("cookie-parser");
const { notFound, errorHandler } = require("./v1/middlewares/errorMiddleware");
const { connect } = require("./v1/config/connect_db");
const port = process.env.PORT || 2525;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/usertasks", userTaskRoutes);

app.use(notFound);
app.use(errorHandler);

connect()
  .then(() => {
    console.log("db");
  })
  .catch((error) => {
    console.log("error db", error);
  });

app.listen(port, () => {
  console.log("Listening on Port:", port);
});
