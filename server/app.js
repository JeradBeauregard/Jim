import express from "express";

import userRoutes from "./features/users/users.routes.js";
import exerciseRoutes from "./features/exercises/exercises.routes.js";
import workoutSessionRoutes from "./features/workoutSessions/workoutSessions.routes.js";
import profileRoutes from "./features/profiles/profiles.routes.js";



const app = express();

// parse JSON request bodies
app.use(express.json());


app.use("/api/users", userRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/profiles", profileRoutes);

app.use((err, req, res, next) => {
  console.error("ERROR:", err.message);

  res.status(err.status || 500).json({
    message: err.message || "Server error"
  });
});

export default app;