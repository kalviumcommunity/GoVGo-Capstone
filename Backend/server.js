import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./Routes/authroutes.js";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Updated MongoDB connection without deprecated options
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo error:", err));

app.use("/api", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port:http://localhost:${PORT}`));

export default app;
