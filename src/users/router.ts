import express from "express";
import userControllers from "./controller";

const userRouter = express.Router();

// /users
userRouter.route("/").get(userControllers.getAllUsers).post(userControllers.createUser);
userRouter
  .route("/:userId")
  .get(userControllers.getUserById)
  .put(userControllers.updateUser)
  .delete(userControllers.deleteUser);
userRouter
  .route("/:userId/projects")
  .get(userControllers.getAllUserProjects)
  .post(userControllers.createProject);
userRouter
  .route("/:userId/projects/:projectId")
  .put(userControllers.updateProject)
  .delete(userControllers.deleteProject)
  .get(userControllers.getProjectById);

export default userRouter;
