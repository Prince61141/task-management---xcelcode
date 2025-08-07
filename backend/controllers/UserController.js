import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { readJSON, writeJSON } from "../utils/fileUtils.js";
const USERS_FILE = "data/users.json";
dotenv.config();

export const register = async (req, res) => {
    const { email, password } = req.body;
    const users = await readJSON(USERS_FILE);
    const existing = users.find((u) => u.email === email);
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    users.push({ id: Date.now().toString(), email, password: hashed });
    await writeJSON(USERS_FILE, users);
    res.status(201).json({ message: "Registered successfully" });
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    const users = await readJSON(USERS_FILE);
    const user = users.find((u) => u.email === email);
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: "2d",
    });
    res.json({ token });
};
