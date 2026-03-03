import baseService from "../../utils/baseService.js";
import Profile from "./profiles.model.js";

const crud = baseService(Profile);

export default { ...crud };