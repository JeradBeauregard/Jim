import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import validate from "../../middleware/validate.js";
import controller from "./users.controllers.js";
import { createUserSchema, updateUserSchema } from "./users.validators.js";

const router = Router();

router.get("/", asyncHandler(controller.getAllUsers));
router.get("/:id", asyncHandler(controller.getUserById));

router.post(
  "/",
  validate(createUserSchema),
  asyncHandler(controller.createUser)
);

router.patch(
  "/:id",
  validate(updateUserSchema),
  asyncHandler(controller.updateUser)
);

router.delete("/:id", asyncHandler(controller.deleteUser));

export default router;