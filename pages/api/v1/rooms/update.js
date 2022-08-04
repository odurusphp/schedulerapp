const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const generaldb = require("../../../../database/db");
import { errorResponse, successResponse } from "../../../../utils/helpers/general";
import { jwtMiddleware } from "../../../../utils/helpers/jwtMiddleware";


export default async function handler(req, res) {
    if (req.method !== "PUT") {
        return errorResponse(res, `${req.method.toUpperCase()} method not allowed`, 405);
    }

    const schema = Joi.object({
         name: Joi.string().required(),
         description: Joi.string().optional(),
         status : Joi.string().required(),
         roomid: Joi.number().optional(),
    });


    // Checking data validation
    const { error } = schema.validate(req.body, { abortEarly: true });
    // if (error) return res.status(400).send({ error: error.details[0].message });
    if (error) return errorResponse(res, error.details[0].message);
    //check if status is active or inactive
    if(req.body.status !== "active" && req.body.status !== "inactive") return errorResponse(res, "Status must be active or inactive");
    const payload = await jwtMiddleware(req, res);
    //check if payload contains businessid
    if (!payload.uid) return errorResponse(res, "You need to be logged in to access this route", 401);
    let roomid = req.body.roomid;
    const room = await generaldb.singlerecord("rooms", "name", req.body.name);

    if (room) return errorResponse(res, "Room already exists", 409);
    //update user details
    const roomdetails = {
        name: req.body.name,
        description: req.body.description,
        status: req.body.status,
    };
    generaldb.update("rooms", "id",roomid, roomdetails);
    //return success response
    return successResponse(res, "User details updated successfully", { roomdetails });
}

