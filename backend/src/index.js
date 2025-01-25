import express from "express";
const app = express();
import authRoutes from "./routes/auth.route.js";

import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
dotenv.config();


app.use("/api/auth", authRoutes);

const port = process.env.PORT || 5001;


app.listen(port, () => {
  console.log("Server is running on port " + port);
  connectDB();
});
