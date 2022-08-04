//get all users
import { errorResponse, successResponse,formatdate } from "../../../../utils/helpers/general";
const generaldb = require("../../../../database/db");
import { jwtMiddleware } from "../../../../utils/helpers/jwtMiddleware";


export default async function handler(req, res) {
  const payload = await jwtMiddleware(req, res);
  //check if payload contains uid
  if (!payload.uid) return errorResponse(res, "You need to be logged in to access this route", 401);
  const rooms = await generaldb.query(
    `SELECT *  from bookings WHERE user_id = ?`, [payload.uid]
    );
    //remove password from response
    rooms.forEach(room => {
      //format date
      room.created_at = formatdate(room.created_at);
       room.updated_at = formatdate(room.updated_at);
    });
   successResponse(res, "Rooms retrieved successfully", rooms);
}