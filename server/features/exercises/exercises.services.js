import baseService from "../../utils/baseService.js";
import Exercise from "./exercises.model.js";

const crud = baseService(Exercise);

export default {
  ...crud,
};