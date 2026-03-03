import baseService from "../../utils/baseService.js";
import WorkoutSession from "./workoutSessions.model.js";

const crud = baseService(WorkoutSession);

export default { ...crud };