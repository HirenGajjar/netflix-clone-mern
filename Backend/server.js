import express from "express";
import authRoutes from "./routes/auth.routes.js";
import { connectDB } from "./config/db.js";
import { ENV_VARIABLE } from "./config/envVars.js";
//
const app = express();
const PORT = ENV_VARIABLE.PORT;
//
app.use(express.json());
app.use("/api/v1/auth", authRoutes);

app.listen(PORT, () => {
  connectDB();
});
