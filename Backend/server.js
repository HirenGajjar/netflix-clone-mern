import express from "express";
//Route imports
import authRoutes from "./routes/auth.routes.js";
import moviesRoutes from "./routes/movies.routes.js";
//Database imports
import { connectDB } from "./config/db.js";
//Environment variable imports
import { ENV_VARIABLE } from "./config/envVars.js";
//
const app = express();
const PORT = ENV_VARIABLE.PORT;
//
app.use(express.json());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/movie", moviesRoutes);

app.listen(PORT, () => {
  connectDB();
});
