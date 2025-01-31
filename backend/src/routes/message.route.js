import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUsersforSidebar } from "../controllers/message.controller.js";

const router = express.Router();

// get all users for sidebar
router.get("/users", protectRoute, getUsersforSidebar);

export default router;
