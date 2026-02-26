import services from "./users.service.js";

const getAllUsers = async (req, res) => {
  const users = await services.getAll();
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await services.getById(req.params.id);
  res.json(user);
};

const createUser = async (req, res) => {
  const user = await services.create(req.body);
  res.status(201).json(user);
};

const updateUser = async (req, res) => {
  const user = await services.update(req.params.id, req.body);
  res.json(user);
};

const deleteUser = async (req, res) => {
  await services.delete(req.params.id);
  res.json({ message: "User deleted", id: req.params.id });
};

export default {
  getAllUsers,
  getUserById,
    createUser,
    updateUser,
    deleteUser
};