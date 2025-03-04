import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";

import userRoutes from "../routes/user.routes.js";
import genreRoutes from "../routes/genre.routes.js";
import categoryRoutes from "../routes/category.routes.js";
import adminRoutes from "../routes/admin.routes.js";
import castRoutes from "../routes/cast.routes.js";
import videoRoutes from "../routes/video.routes.js";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CORS Options
const corsOptions = {
  origin: process.env.CORS_OPTIONS || "http://localhost:3000",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization",
};

// Middlewares
app.use(cors(corsOptions));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(express.static("public"));
app.use("/public", express.static(path.join(__dirname, "public")));

// Options
app.options("*", cors(corsOptions));

// Routes
app.use("/api/users", userRoutes);
app.use("/api/genres", genreRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/casts", castRoutes);
app.use("/api/videos", videoRoutes);

// Test Route
app.get("/api", (req, res) => {
  res.json({
    message: "Hello World!",
  });
});

export default app;
