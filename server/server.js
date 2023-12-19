const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const userTaskRoutes = require("./routes/userTaskRoutes");
dotenv.config();
const cookieParser = require("cookie-parser");
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
const connection = require("./config/connect_db");
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

connection.connect((err) => {
  if (err) {
    console.log("Error connecting the Database");
  } else {
    console.log("Database Connection Successful");
    app.listen(port, () => {
      console.log("Listening on Port:", port);
    });
  }
});
