import express from "express";

import userRoutes from "./features/users/users.routes.js";



const app = express();

// parse JSON request bodies
app.use(express.json());


app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  console.error("ERROR:", err.message);

  res.status(err.status || 500).json({
    message: err.message || "Server error"
  });
});

export default app;