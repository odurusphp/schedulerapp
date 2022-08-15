//get all users
import { errorResponse, successResponse,formatdate } from "../../../../utils/helpers/general";
const generaldb = require("../../../../database/db");
import { jwtMiddleware } from "../../../../utils/helpers/jwtMiddleware";


export default async function handler(req, res) {
  const payload = await jwtMiddleware(req, res);
  //check if payload contains uid
  if (!payload.uid) return errorResponse(res, "You need to be logged in to access this route", 401);
    //check if user is admin
    if (payload.role !== "admin") return errorResponse(res, "You need to be an admin to access this route", 401);
    //get stats of all bookings fir the day cancalled and confirmed
    const stats = await generaldb.query(
        `SELECT
        (SELECT COUNT(*) FROM bookings WHERE status = 'confirmed') AS confirmed,
        (SELECT COUNT(*) FROM bookings WHERE status = 'cancelled') AS cancelled
        `, []
    );
    successResponse(res, "Stats retrieved successfully", stats);
}