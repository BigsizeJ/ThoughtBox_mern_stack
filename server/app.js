require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const connectToDB = require("./database");
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const thoughtRouter = require("./routes/thoughtRouter");

app.use(cors());
app.use(express.json());

connectToDB();

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/thoughts", thoughtRouter);

app.listen(3000, (err) => {
  if (err) throw new Error(err);
  console.log("Server running at http://localhost:3000");
});
