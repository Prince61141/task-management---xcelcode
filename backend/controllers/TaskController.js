import { readJSON, writeJSON } from "../utils/fileUtils.js";
const TASKS_FILE = "data/tasks.json";

export const getTasks = async (req, res) => {
    const tasks = await readJSON(TASKS_FILE);
    let userTasks = tasks.filter((t) => t.userId === req.userId);

    const { status, sort } = req.query;
    if (status && ["Pending", "Done"].includes(status)) {
        userTasks = userTasks.filter((t) => t.status === status);
    }
    if (sort === "asc") {
        userTasks = userTasks.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
    } else if (sort === "desc") {
        userTasks = userTasks.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    }
    res.json({ tasks: userTasks }); 
};

export const createTask = async (req, res) => {
    const { title, description, status } = req.body;
    const tasks = await readJSON(TASKS_FILE);
    const now = Date.now();
    const newTask = {
        id: now.toString(),
        title,
        description,
        status,
        userId: req.userId,
        createdAt: now,
    };
    tasks.push(newTask);
    await writeJSON(TASKS_FILE, tasks);
    res.status(201).json(newTask);
};

export const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const tasks = await readJSON(TASKS_FILE);
    const index = tasks.findIndex((t) => t.id === id && t.userId === req.userId);
    if (index === -1) return res.status(404).json({ message: "Task not found" });
    tasks[index] = { ...tasks[index], title, description, status };
    await writeJSON(TASKS_FILE, tasks);
    res.json(tasks[index]);
};

export const deleteTask = async (req, res) => {
    const { id } = req.params;
    const tasks = await readJSON(TASKS_FILE);
    const updated = tasks.filter(
        (t) => !(t.id === id && t.userId === req.userId)
    );
    if (updated.length === tasks.length)
        return res.status(404).json({ message: "Task not found" });
    await writeJSON(TASKS_FILE, updated);
    res.json({ message: "Task deleted" });
};