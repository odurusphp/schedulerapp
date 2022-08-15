// const Joi = require("joi");
const jwt = require("jsonwebtoken");
const generaldb = require("../../../../database/db");
const lodash = require("lodash");
const send = require("../../../../utils/helpers/email");
import { errorResponse, formatdate, successResponse } from "../../../../utils/helpers/general";
import { jwtMiddleware } from "../../../../utils/helpers/jwtMiddleware";
import DateExtension from '@joi/date';
import JoiImport from 'joi';
const Joi = JoiImport.extend(DateExtension);


export default async function handler(req, res) {
    if (req.method !== "POST") {
        res.status(405).send("Method Not Alllowed");
        return;
    }

    const schema = Joi.object({
        from_date: Joi.string().required(),
        to_date: Joi.string().required(),
        roomid: Joi.number().required(),
        userid: Joi.number().optional(),
    });


    const payload = await jwtMiddleware(req, res);
    //check if payload contains businessid
    if (!payload.uid) return errorResponse(res, "You need to be logged in to access this route", 401);
    // Checking data validation
    const { error } = schema.validate(req.body, { abortEarly: true });
    if (error) return errorResponse(res, error.details[0].message);

    //make sure from_date is in format YYYY-MM-DD HH:MM:SS and to_date is in format YYYY-MM-DD HH:MM:SS
    const from_date = new Date(req.body.from_date);
    const to_date = new Date(req.body.to_date);
    if (from_date.toString() === "Invalid Date" || to_date.toString() === "Invalid Date") {
        return errorResponse(res, "Invalid date format", 400);
    }
    //make sure room exists
    const room = await generaldb.singlerecord("rooms", "id", req.body.roomid);
    if (!room) return errorResponse(res, "Room does not exist", 409);
    //from_date and to_date must be in the future
    if (req.body.from_date < Date.now()) return errorResponse(res, "From date must be in the future", 409);
    //from_date must be before to_date
    if (req.body.from_date > req.body.to_date) return errorResponse(res, "From date must be before to_date", 409);
    //check if room is available by checking if there is a booking for the room in the time period from_date to_date using roomid custom query and booking is not cancelled
    const booking = await generaldb.query("SELECT * FROM bookings WHERE room_id = ? AND (from_date BETWEEN ? AND ? OR to_date BETWEEN ? AND ?) AND status != ?", [req.body.roomid, req.body.from_date, req.body.to_date,req.body.from_date, req.body.to_date, "cancelled"]);
    if (booking.length > 0) return errorResponse(res, "Room is not available", 409);
    let uid = payload.uid;
    if (req.body.userid && payload.role !== "admin") return errorResponse(res, "You need to be an admin to access this route", 401);
    if (!req.body.userid) req.body.userid = uid;
    // 
    const user = await generaldb.singlerecord("users", "id",req.body.userid);

    //book room
    const bookingdetails = {
        from_date: req.body.from_date,
        to_date: req.body.to_date,
        room_id: req.body.roomid,
        user_id:req.body.userid,
        status: "pending",
        room: room.name,
        user:(user.title + " " + user.firstname + " " + user.lastname).trim(),
    };
    generaldb.add("bookings", bookingdetails);
    //get latest booking id
    const latestbooking = await generaldb.lastinsertrecord("id", "bookings");
    //get record of booking just added
    const newbooking = await generaldb.singlerecord("bookings", "id", latestbooking);
    //format date
    newbooking.created_at = formatdate(newbooking.created_at);
    // newbooking.uodated_at = formatdate(newbooking.updated_at);
    newbooking.from_date = formatdate(newbooking.from_date);
    newbooking.to_date = formatdate(newbooking.to_date);
    //send email to user
    const email = user.email;
    const subject = "Booking Confirmation";
    const message = `<p>Hi ${user.firstname},</p>
    <p>You have successfully booked <strong> ${room.name} </strong> from <strong>${newbooking.from_date}</strong> to <strong> ${newbooking.to_date}</strong> </p>
    <p>Thank you for using our service</p>
    <p>Regards,</p>
    <p>The Booking System</p>`;
    send(email, subject, message);
    //return success response
    return successResponse(res, "Booking made successfully", newbooking);
}
