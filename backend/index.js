import dotenv from "dotenv";
import connectDB from "./config/db.js";
import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import couponRoutes from "./routes/couponRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);
app.use("/api/coupon", couponRoutes);
app.use("/api/user", userRoutes);


dotenv.config();
const PORT = process.env.PORT || 5000;

// Connect to DB
connectDB();

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// app.listen(PORT, () => {
//   console.log(`Running on PORT: ${PORT}`);
// });

export default app;