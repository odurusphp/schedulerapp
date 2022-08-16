import { errorResponse, successResponse } from "../../../../utils/helpers/general";
const Joi = require("joi");
const generaldb = require("../../../../database/db");
import { jwtMiddleware } from "../../../../utils/helpers/jwtMiddleware";

const bcrypt = require("bcryptjs");
export default async function handler(req, res) {
    if (req.method !== "PATCH") return errorResponse(res, "Method Not Allowed", 405);
    const schema = Joi.object({
        status : Joi.string().required(),
        userid: Joi.number().required(),
    });
    const payload = await jwtMiddleware(req, res);
    //check if payload contains userid
    let userid = req.body.userid;
    let { status } = req.body;
    if (!payload.uid) return errorResponse(res, "You need to be logged in to access this route", 401);
    const { error } = schema.validate(req.body, { abortEarly: true });
    if (error) return errorResponse(res, error.details[0].message);
    try {
        //check if old password is correct
        const user = await generaldb.singlerecord('users', 'id',userid);
        if (!user) return errorResponse(res, "User not found", 404);
        generaldb.update('users', 'id', userid, { status });
        return successResponse(res, "User status has been changed successfully.", {});
    } catch (error) {
        return errorResponse(res, "Failed to change user status", 500);
    }
}
