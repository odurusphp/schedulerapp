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
        from_date: Joi.date().format("YYYY-MM-DD").required(),
        to_date: Joi.date().format("YYYY-MM-DD HH:MM:SS").required(),
        roomid: Joi.number().required(),
        userid: Joi.number().optional(),
    });

    const payload = await jwtMiddleware(req, res);
    //check if payload contains businessid
    if (!payload.uid) return errorResponse(res, "You need to be logged in to access this route", 401);
    // Checking data validation
    const { error } = schema.validate(req.body, { abortEarly: true });
    if (error) return errorResponse(res, error.details[0].message);
    //make sure room exists
    const room = await generaldb.singlerecord("rooms", "id", req.body.roomid);
    if (!room) return errorResponse(res, "Room does not exist", 409);
    //from_date and to_date must be in the future
    if (req.body.from_date < Date.now()) return errorResponse(res, "From date must be in the future", 409);
    //from_date must be before to_date
    if (req.body.from_date > req.body.to_date) return errorResponse(res, "From date must be before to_date", 409);
    //check if room is available by checking if there is a booking for the room in the time period from_date to_date using roomid custom query and booking is not cancelled
    const booking = await generaldb.query("SELECT * FROM bookings WHERE roomid = $1 AND (from_date BETWEEN $2 AND $3 OR to_date BETWEEN $2 AND $3) AND status != $4", [req.body.roomid, req.body.from_date, req.body.to_date, "cancelled"]);
    if (booking.length > 0) return errorResponse(res, "Room is not available", 409);
    let uid = payload.uid;
    if (req.body.userid && payload.role !== "admin") return errorResponse(res, "You need to be an admin to access this route", 401);
    if (!req.body.userid) req.body.userid = uid;
    //book room
    const bookingdetails = {
        from_date: req.body.from_date,
        to_date: req.body.to_date,
        roomid: req.body.roomid,
        userid:req.body.userid,
        status: "pending",
    };
    generaldb.add("bookings", bookingdetails);
    //get record of booking just added
    const newbooking = await generaldb.singlerecord("bookings", "id", bookingdetails.id);
    //format date
    newbooking.created_at = formatdate(newbooking.created_at);
    newbooking.updated_at = formatdate(newbooking.updated_at);
    newbooking.from_date = formatdate(newbooking.from_date);
    newbooking.to_date = formatdate(newbooking.to_date);
    //send email to user
    const user = await generaldb.singlerecord("users", "id",req.body.userid);
    const email = user.email;
    const subject = "Booking Confirmation";
    const message = `<p>Hi ${user.firstname},</p>
    <p>You have successfully booked a room from ${newbooking.from_date} to ${newbooking.to_date}</p>
    <p>Thank you for using our service</p>
    <p>Regards,</p>
    <p>The Booking System</p>`;
    send(email, subject, message);
    //return success response
    return successResponse(res, "Booking made successfully", newbooking);
}

function createWebToken(user) {
    const token = jwt.sign(user, process.env.JWT_SECRET);
    return token;
}
