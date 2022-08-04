require("dotenv").config();
const Joi = require("joi");
const generaldb = require("../../../../database/db");
import { errorResponse, successResponse ,formatdate} from "../../../../utils/helpers/general";

export default async function handler(req, res) {
  const userid = req.query.user;

  const user = await generaldb.singlerecord("users", "id", userid);

  if (!user) return errorResponse(res, "User not found", 404);
  //remove password from response
  delete user.password;
  //format date
  user.created_on = formatdate(user.created_on);
  successResponse(res, "User info retrieved successfully", { user });
}
