import { Router } from "express";
import asyncHandler from "../../utils/asyncHandler.js";
import validate from "../../middleware/validate.js";
import controller from "./profiles.controller.js";
import {
  createProfileSchema,
  updateProfileSchema
} from "./profiles.validators.js";

const router = Router();

router.get("/", asyncHandler(controller.getAllProfiles));
router.get("/:id", asyncHandler(controller.getProfileById));

router.post("/", validate(createProfileSchema), asyncHandler(controller.createProfile));
router.patch("/:id", validate(updateProfileSchema), asyncHandler(controller.updateProfile));
router.delete("/:id", asyncHandler(controller.deleteProfile));

export default router;