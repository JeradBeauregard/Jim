import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import validate from "../../middleware/validate.js";
import controller from "./workoutSessions.controllers.js";
import {
  createWorkoutSessionSchema,
  updateWorkoutSessionSchema
} from "./workoutSession.validators.js";

const router = Router();

router.get("/", asyncHandler(controller.getAllWorkoutSessions));
router.get("/:id", asyncHandler(controller.getWorkoutSessionById));

router.post("/", validate(createWorkoutSessionSchema), asyncHandler(controller.createWorkoutSession));
router.patch("/:id", validate(updateWorkoutSessionSchema), asyncHandler(controller.updateWorkoutSession));
router.delete("/:id", asyncHandler(controller.deleteWorkoutSession));

export default router;