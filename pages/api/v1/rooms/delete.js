//get all users
import Joi from "joi";
import { errorResponse, successResponse,formatdate } from "../../../../utils/helpers/general";
const generaldb = require("../../../../database/db");
import { jwtMiddleware } from "../../../../utils/helpers/jwtMiddleware";


export default async function handler(req, res) {
    if (req.method !== "POST") {
        return errorResponse(res, "Method Not Allowed", 405);
        return;
      }
      const schema = Joi.object({
        roomid: Joi.number().required(),
      });
    
  const payload = await jwtMiddleware(req, res);
  //check if payload contains uid
  if (!payload.uid) return errorResponse(res, "You need to be logged in to access this route", 401);
  //check if user is admin
  if (payload.role !== "admin") return errorResponse(res, "You need to be an admin to access this route", 401);

    const { error } = schema.validate(req.body, { abortEarly: true });
    if (error) return errorResponse(res, error.details[0].message);
    try {   
        const room = await generaldb.singlerecord("rooms", "id", req.body.roomid);
        if (!room) return errorResponse(res, "Room does not exist", 404);
         generaldb.deleterecord("rooms", "id", req.body.roomid);
        return successResponse(res, "Room has been deleted successfully", {});
    } catch (error) {
        return errorResponse(res, "Failed to delete room", 500);
    }
}