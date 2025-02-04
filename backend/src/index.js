import express from "express";
const app = express();
import authRoutes from "./routes/auth.route.js";

import dotenv from "dotenv";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js";

import cors from 'cors';


dotenv.config();



// to extract json data from the body of the request
app.use(express.json());

app.use(cookieParser());


app.use(cors({
  origin : 'http://localhost:5173',
  credentials:true,
}
))

app.use(express.json({ limit: "100mb" })); 
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.use("/api/auth", authRoutes);

// for messages
app.use("/api/message", messageRoutes);

const port = process.env.PORT || 5001;


app.listen(port, () => {
  console.log("Server is running on port " + port);
  connectDB();
});
