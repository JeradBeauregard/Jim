import baseService from "../../utils/baseService.js";
import Routine from "./routines.model.js";

const crud = baseService(Routine);

export default { ...crud };