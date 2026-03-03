import mongoose from "mongoose";
import services from "./profiles.services.js";

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

const getAllProfiles = async (req, res) => {
  const profiles = await services.getAll({}, { sort: { createdAt: -1 } });
  res.json(profiles);
};

const getProfileById = async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json({ message: "Invalid profile id" });
  }

  const profile = await services.getById(id);
  if (!profile) {
    return res.status(404).json({ message: "Profile not found" });
  }

  res.json(profile);
};

const createProfile = async (req, res) => {
  const profile = await services.create(req.body);
  res.status(201).json(profile);
};

const updateProfile = async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json({ message: "Invalid profile id" });
  }

  const updated = await services.update(id, req.body);
  if (!updated) {
    return res.status(404).json({ message: "Profile not found" });
  }

  res.json(updated);
};

const deleteProfile = async (req, res) => {
  const { id } = req.params;

  if (!isValidId(id)) {
    return res.status(400).json({ message: "Invalid profile id" });
  }

  const deleted = await services.remove(id);
  if (!deleted) {
    return res.status(404).json({ message: "Profile not found" });
  }

  res.json({ message: "Profile deleted", id });
};

export default {
  getAllProfiles,
  getProfileById,
  createProfile,
  updateProfile,
  deleteProfile
};