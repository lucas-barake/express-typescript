import express, { type Application } from "express";
import userRouter from "./users/router";

const app: Application = express();

// middleware
app.use(express.json());

app.use("/users", userRouter);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
