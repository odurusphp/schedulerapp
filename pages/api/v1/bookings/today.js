//get all users
import { errorResponse, successResponse, formatdate,getDuration } from "../../../../utils/helpers/general";
const generaldb = require("../../../../../database/db");
import { jwtMiddleware } from "../../../../../utils/helpers/jwtMiddleware";


export default async function handler(req, res) {
  const payload = await jwtMiddleware(req, res);

  if (!payload.uid) return errorResponse(res, "You need to be logged in to access this route", 401);
  //check if user is admin
  if (payload.role !== "admin") return errorResponse(res, "You need to be an admin to access this route", 401);
  ///get current date
  const date = new Date();
  //get all bookings for the day and the room_id is equal to the room_id in the query
  const bookings = await generaldb.query(
    `SELECT *  from bookings WHERE (from_date >= CURDATE()
      AND from_date < CURDATE() + INTERVAL 1 DAY OR to_date >= CURDATE()
      AND to_date < CURDATE() + INTERVAL 1 DAY)`, []
  );
  //loop through bookings and  get duation of each booking
  bookings.forEach(booking => {
    //get duration of booking
    const duration = getDuration(booking.from_date, booking.to_date);
    //add duration to booking
    booking.duration = duration;
    //check if booking is happening now and get the time left for the booking to end
    if (booking.from_date <= date && booking.to_date >= date) {
      booking.timeleft = getDuration(date, booking.to_date);
    }
   
  });
  return successResponse(res, "Stats retrieved successfully", bookings);
}