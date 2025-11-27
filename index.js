import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();
console.log("DEBUG MONGO_URI =", process.env.MONGO_URI);  
// ===============================================
// 🧠 MongoDB Connection
// ===============================================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB is Connected");
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err.message);
  });

// ===============================================
// 🚀 Express App Setup
// ===============================================
const app = express();
app.use(express.json());

// ===============================================
// 🧾 Logging Middleware  ✅ (PUT HERE — very top of middlewares)
// ===============================================
app.use((req, res, next) => {
  console.log(`➡️ ${req.method} ${req.url}`);
  next();
});

// ===============================================
// ✅ CORS Configuration  ✅ (PUT RIGHT AFTER logging)
// ===============================================
const allowedOrigins = [
  "http://localhost:5173", // Vite dev server
  "http://localhost:81",   // Nginx reverse proxy
  "http://75.101.222.232:5173", // EC2 Vite frontend
  "http://75.101.222.232:81",
  "http://75.101.222.232:80",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

// ===============================================
// 📦 Routes
// ===============================================
app.get("/", (req, res) => {
  res.send("Bcknd✅");
});

app.use("/api/todo", todoRoutes);

// ===============================================
// ❗ Error Handling Middleware
// ===============================================
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

// ===============================================
// 🏁 Start Server
// ===============================================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
