import mongoose from "mongoose";
import services from "./routines.services.js";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const getAllRoutines = async (req, res) => {
  const routines = await services.getAll({}, { sort: { createdAt: -1 } });
  res.json(routines);
};

const getRoutineById = async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) return res.status(400).json({ message: "Invalid routine id" });

  const routine = await services.getById(id);
  if (!routine) return res.status(404).json({ message: "Routine not found" });

  res.json(routine);
};

const createRoutine = async (req, res) => {
  const routine = await services.create(req.body);
  res.status(201).json(routine);
};

const updateRoutine = async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) return res.status(400).json({ message: "Invalid routine id" });

  const updated = await services.update(id, req.body);
  if (!updated) return res.status(404).json({ message: "Routine not found" });

  res.json(updated);
};

const deleteRoutine = async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) return res.status(400).json({ message: "Invalid routine id" });

  const deleted = await services.remove(id);
  if (!deleted) return res.status(404).json({ message: "Routine not found" });

  res.json({ message: "Routine deleted", id });
};

export default {
  getAllRoutines,
  getRoutineById,
  createRoutine,
  updateRoutine,
  deleteRoutine
};