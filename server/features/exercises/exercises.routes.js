import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import validate from "../../middleware/validate.js";
import controller from "./exercises.controller.js";
import {
  createExerciseSchema,
  updateExerciseSchema,
} from "./exercises.validators.js";

const router = Router();

router.get("/", asyncHandler(controller.getAllExercises));
router.get("/:id", asyncHandler(controller.getExerciseById));

router.post(
  "/",
  validate(createExerciseSchema),
  asyncHandler(controller.createExercise)
);

router.patch(
  "/:id",
  validate(updateExerciseSchema),
  asyncHandler(controller.updateExercise)
);

router.delete("/:id", asyncHandler(controller.deleteExercise));

export default router;