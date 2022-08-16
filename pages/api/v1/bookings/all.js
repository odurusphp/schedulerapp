//get all users
import {
  errorResponse,
  successResponse,
  formatdate,
} from "../../../../utils/helpers/general";
const generaldb = require("../../../../database/db");
import { jwtMiddleware } from "../../../../utils/helpers/jwtMiddleware";

export default async function handler(req, res) {
  const payload = await jwtMiddleware(req, res);
  //check if payload contains uid
  if (!payload.uid)
    return errorResponse(
      res,
      "You need to be logged in to access this route",
      401
    );
  //check if user is admin
  if (payload.role !== "admin")
    return errorResponse(
      res,
      "You need to be an admin to access this route",
      401
    );
  const bookings = await generaldb.query(
    `SELECT *  from bookings order by id desc`,
    []
  );
  //remove password from response
  successResponse(res, "Rooms retrieved successfully", bookings);
}
