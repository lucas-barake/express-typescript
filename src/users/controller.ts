import { type Request, type Response } from "express";
import { projectSchema, type ProjectSchema, userSchema, type UserSchema } from "../schemas";

const users: UserSchema[] = [
  {
    id: 2,
    name: "Jane Doe",
    email: "jane.doe@example.com",
    projects: [
      {
        id: 3,
        name: "Project 3",
        description: "A new project",
        tasks: [],
      },
    ],
  },
];

const getAllUsers = (req: Request, res: Response): void => {
  res.json(users);
};

const getUserById = (req: Request, res: Response): void => {
  const userId = Number(req.params.userId);
  const user = users.find((user) => user.id === userId);

  if (user === undefined) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json(user);
};

const createUser = (req: Request, res: Response): void => {
  const user = req.body;
  const parsedUser = userSchema.omit({ id: true }).safeParse(user);

  if (!parsedUser.success) {
    res.status(400).json({ error: parsedUser.error.flatten().fieldErrors });
    return;
  }

  const newUser: UserSchema = {
    ...parsedUser.data,
    id: users.length + 1,
  };

  users.push(newUser);
  res.json(newUser);
};

const updateUser = (req: Request, res: Response): void => {
  const userId = Number(req.params.userId);
  const user = users.find((user) => user.id === userId);

  if (user === undefined) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const parsedUser = userSchema.partial().safeParse(req.body);

  if (!parsedUser.success) {
    res.status(400).json({ error: parsedUser.error.flatten().fieldErrors });
    return;
  }

  const updatedUser: UserSchema = {
    ...user,
    ...parsedUser.data,
  };

  const userIndex = users.findIndex((user) => user.id === userId);
  users[userIndex] = updatedUser;

  res.json(updatedUser);
};

const deleteUser = (req: Request, res: Response): void => {
  const userId = Number(req.params.userId);
  const userIndex = users.findIndex((user) => user.id === userId);

  if (userIndex === -1) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  users.splice(userIndex, 1);
  res.json({ message: "User deleted" });
};

// GET /users/:userId/projects
const getAllUserProjects = (req: Request, res: Response): void => {
  const userId = Number(req.params.userId);
  const user = users.find((user) => user.id === userId);

  if (user === undefined) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  res.json(user.projects);
};

// POST /users/:userId/projects
const createProject = (req: Request, res: Response): void => {
  const userId = Number(req.params.userId);
  const user = users.find((user) => user.id === userId);

  if (user === undefined) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const project = req.body;
  const parsedProject = projectSchema.omit({ id: true }).safeParse(project);

  if (!parsedProject.success) {
    res.status(400).json({ error: parsedProject.error.flatten().fieldErrors });
    return;
  }

  const newProject: ProjectSchema = {
    ...parsedProject.data,
    id: user.projects.length + 1,
  };

  user.projects.push(newProject);
  res.json(newProject);
};

// GET /users/:userId/projects/:projectId
const getProjectById = (req: Request, res: Response): void => {
  const userId = Number(req.params.userId);
  const user = users.find((user) => user.id === userId);

  if (user === undefined) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const projectId = Number(req.params.projectId);
  const project = user.projects.find((project) => project.id === projectId);

  if (project === undefined) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  res.json(project);
};

// PUT /users/:userId/projects/:projectId
const updateProject = (req: Request, res: Response): void => {
  const userId = Number(req.params.userId);
  const user = users.find((user) => user.id === userId);

  if (user === undefined) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const projectId = Number(req.params.projectId);
  const project = user.projects.find((project) => project.id === projectId);

  if (project === undefined) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  const parsedProject = projectSchema.partial().safeParse(req.body);

  if (!parsedProject.success) {
    res.status(400).json({ error: parsedProject.error.flatten().fieldErrors });
    return;
  }

  const updatedProject: ProjectSchema = {
    ...project,
    ...parsedProject.data,
  };

  const projectIndex = user.projects.findIndex((project) => project.id === projectId);
  user.projects[projectIndex] = updatedProject;

  res.json(updatedProject);
};

// DELETE /users/:userId/projects/:projectId
const deleteProject = (req: Request, res: Response): void => {
  const userId = Number(req.params.userId);
  const user = users.find((user) => user.id === userId);

  if (user === undefined) {
    res.status(404).json({ error: "User not found" });
    return;
  }

  const projectId = Number(req.params.projectId);
  const projectIndex = user.projects.findIndex((project) => project.id === projectId);

  if (projectIndex === -1) {
    res.status(404).json({ error: "Project not found" });
    return;
  }

  user.projects.splice(projectIndex, 1);
  res.json({ message: "Project deleted" });
};

const userControllers = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getAllUserProjects,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
};

export default userControllers;
