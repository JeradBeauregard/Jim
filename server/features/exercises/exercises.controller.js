import mongoose from "mongoose";
import services from "./exercises.services.js";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const getAllExercises = async (req, res) => {
  // Admin-style: get everything (simple MVP)
  const exercises = await services.getAll({}, { sort: { createdAt: -1 } });
  res.json(exercises);
};

const getExerciseById = async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json({ message: "Invalid exercise id" });
  }

  const exercise = await services.getById(id);
  if (!exercise) {
    return res.status(404).json({ message: "Exercise not found" });
  }

  res.json(exercise);
};

const createExercise = async (req, res) => {
  const exercise = await services.create(req.body);
  res.status(201).json(exercise);
};

const updateExercise = async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json({ message: "Invalid exercise id" });
  }

  const updated = await services.update(id, req.body);
  if (!updated) {
    return res.status(404).json({ message: "Exercise not found" });
  }

  res.json(updated);
};

const deleteExercise = async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json({ message: "Invalid exercise id" });
  }

  const deleted = await services.remove(id);
  if (!deleted) {
    return res.status(404).json({ message: "Exercise not found" });
  }

  res.json({ message: "Exercise deleted", id });
};

export default {
  getAllExercises,
  getExerciseById,
  createExercise,
  updateExercise,
  deleteExercise,
};