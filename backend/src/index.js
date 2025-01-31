import express from "express";
const app = express();
import authRoutes from "./routes/auth.route.js";

import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js";

dotenv.config();



// to extract json data from the body of the request
app.use(express.json());

app.use(cookieParser());


app.use("/api/auth", authRoutes);

// for messages
app.use("/api/message", messageRoutes);

const port = process.env.PORT || 5001;


app.listen(port, () => {
  console.log("Server is running on port " + port);
  connectDB();
});
