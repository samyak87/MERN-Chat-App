import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMessages, getUsersforSidebar, sendMessage } from "../controllers/message.controller.js";

const router = express.Router();

// get all users for sidebar
router.get("/users", protectRoute, getUsersforSidebar);

// get messages from the receiver
router.get("/:id",protectRoute, getMessages);

// sending message to the receiver
router.post("/send/:id",protectRoute, sendMessage);

export default router;
