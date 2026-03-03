import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import validate from "../../middleware/validate.js";
import controller from "./routines.controller.js";
import { createRoutineSchema, updateRoutineSchema } from "./routines.validators.js";

const router = Router();

router.get("/", asyncHandler(controller.getAllRoutines));
router.get("/:id", asyncHandler(controller.getRoutineById));

router.post("/", validate(createRoutineSchema), asyncHandler(controller.createRoutine));
router.patch("/:id", validate(updateRoutineSchema), asyncHandler(controller.updateRoutine));
router.delete("/:id", asyncHandler(controller.deleteRoutine));

export default router;