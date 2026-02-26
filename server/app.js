import express from "express";

// import authRoutes from "./features/auth/auth.routes.js";
// import exerciseRoutes from "./features/exercises/exercises.routes.js";
// import routineRoutes from "./features/routines/routines.routes.js";

const app = express();

// parse JSON request bodies
app.use(express.json());

// mount routes
// app.use("/api/auth", authRoutes);
// app.use("/api/exercises", exerciseRoutes);
// app.use("/api/routines", routineRoutes);

// basic error handler (temporary)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

export default app;