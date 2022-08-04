const Joi = require("joi");
const jwt = require("jsonwebtoken");
const generaldb = require("../../../../database/db");
const lodash = require("lodash");
const send = require("../../../../utils/helpers/email");
import { errorResponse, formatdate, successResponse } from "../../../../utils/helpers/general";
import { jwtMiddleware } from "../../../../utils/helpers/jwtMiddleware";


export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Alllowed");
    return;
  }

  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().optional(),
  });

  const payload = await jwtMiddleware(req, res);
  //check if payload contains businessid
  if (!payload.uid) return errorResponse(res, "You need to be logged in to access this route", 401);
  //check if user is admin
  if (payload.role !== "admin") return errorResponse(res, "You need to be an admin to access this route", 401);
  // Checking data validation
  const { error } = schema.validate(req.body, { abortEarly: true });
  if(error) return errorResponse(res, error.details[0].message);
  // Checking if user already exists
  const user = await generaldb.singlerecord("rooms", "name", req.body.name);
  if (user) return errorResponse(res, "Room already exists",409);
    //generate 6 word random password for user and add to database
    const roomdetails = {
        name: req.body.name,
        description: req.body.description,
    };
   generaldb.add("rooms", roomdetails);
   //get record of room just added
  const room = await generaldb.singlerecord("rooms", "name", req.body.name);
    //format date
    room.created_at = formatdate(room.created_at);
    room.updated_at = formatdate(room.updated_at);
  return successResponse(res, "Room created successfully",room);
}

function createWebToken(user) {
  const token = jwt.sign(user, process.env.JWT_SECRET);
  return token;
}
