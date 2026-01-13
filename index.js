import dotenv from "dotenv";
dotenv.config({ path: ".env.template" });

import express from "express";
import cors from "cors";
import taskRoutes from "./routes/tasks.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/tasks", taskRoutes);

app.listen(5000, () => console.log("Server running on http://localhost:5000"));
