import express from "express";
import { v4 as uuid } from "uuid";

const router = express.Router();

// In-memory storage for tasks
let tasks = [
  {
    id: "1",
    title: "Complete assignment",
    description: "Finish the MERN + DynamoDB task manager",
    status: "pending",
    createdAt: new Date().toISOString()
  },
  {
    id: "2",
    title: "Review code",
    description: "Check for improvements and bugs",
    status: "done",
    createdAt: new Date().toISOString()
  }
];

// GET all tasks
router.get("/", (req, res) => {
  res.json(tasks);
});

// POST new task
router.post("/", (req, res) => {
  const task = {
    id: uuid(),
    title: req.body.title,
    description: req.body.description || "",
    status: "pending",
    createdAt: new Date().toISOString()
  };
  
  tasks.push(task);
  res.status(201).json(task);
});

// PUT update task
router.put("/:id", (req, res) => {
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }
  
  tasks[index] = {
    ...tasks[index],
    title: req.body.title,
    description: req.body.description || "",
    status: req.body.status
  };
  
  res.json(tasks[index]);
});

// DELETE task
router.delete("/:id", (req, res) => {
  const index = tasks.findIndex(t => t.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ error: "Task not found" });
  }
  
  tasks = tasks.filter(t => t.id !== req.params.id);
  res.sendStatus(204);
});

export default router;
