import mongoose from "mongoose";
import services from "./workoutSessions.services.js";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const getAllWorkoutSessions = async (req, res) => {
  // Admin-style: all sessions
  const sessions = await services.getAll({}, { sort: { startedAt: -1 } });
  res.json(sessions);
};

const getWorkoutSessionById = async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) return res.status(400).json({ message: "Invalid session id" });

  const session = await services.getById(id);
  if (!session) return res.status(404).json({ message: "Workout session not found" });

  res.json(session);
};

const createWorkoutSession = async (req, res) => {
  const session = await services.create(req.body);
  res.status(201).json(session);
};

const updateWorkoutSession = async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) return res.status(400).json({ message: "Invalid session id" });

  const updated = await services.update(id, req.body);
  if (!updated) return res.status(404).json({ message: "Workout session not found" });

  res.json(updated);
};

const deleteWorkoutSession = async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) return res.status(400).json({ message: "Invalid session id" });

  const deleted = await services.remove(id);
  if (!deleted) return res.status(404).json({ message: "Workout session not found" });

  res.json({ message: "Workout session deleted", id });
};

export default {
  getAllWorkoutSessions,
  getWorkoutSessionById,
  createWorkoutSession,
  updateWorkoutSession,
  deleteWorkoutSession
};