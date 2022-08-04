import { errorResponse, successResponse } from "../../../../utils/helpers/general";
const Joi = require("joi");
const generaldb = require("../../../../database/db");
import { jwtMiddleware } from "../../../../utils/helpers/jwtMiddleware";

const bcrypt = require("bcryptjs");
export default async function handler(req, res) {
    if (req.method !== "POST") return errorResponse(res, "Method Not Allowed", 405);
    const schema = Joi.object({
        oldpassword : Joi.string().required(),
        password: Joi.string().required(),
        confirmpassword: Joi.string().required().valid(Joi.ref('password')),
    });
    const payload = await jwtMiddleware(req, res);
    //check if payload contains businessid
    if (!payload.uid) return errorResponse(res, "You need to be logged in to access this route", 401);
    const { error } = schema.validate(req.body, { abortEarly: true });
    if (error) return errorResponse(res, error.details[0].message);
    try {
        //check if old password is correct
        const user = await generaldb.singlerecord('users', 'id', payload.uid);
        const isMatch = await bcrypt.compare(req.body.oldpassword, user.password);
        if (!isMatch) return errorResponse(res, "Old password is incorrect");
        //update password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        generaldb.update('users', 'id', payload.uid, { password: hash });
        return successResponse(res, "Password has been changed successfully please proceed to login", {});
    } catch (error) {
        return errorResponse(res, "Failed to update password", 500);
    }
}
