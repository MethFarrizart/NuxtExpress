import mongoose from "mongoose";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import userRoute from "./api/route/userRoute.js";
import authMiddleware from "../app/middleware/auth.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT;
const allow_site = process.env.ALLOW_SITE;

// Middleware
app.use(cors({ origin: allow_site, credentials: true }));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ Error connecting to MongoDB:", err));

// log route
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.originalUrl}`);
  next();
});

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});

// Routes
// app.use("/api/product", authMiddleware, productRoutes);
// app.use("/api/category", authMiddleware, categoryRoutes);
app.use("/api/user", userRoute);

export default app;
