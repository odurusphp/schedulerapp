import { errorResponse, successResponse } from "../../../../utils/helpers/general";
const Joi = require("joi");
const generaldb = require("../../../../database/db");
import { jwtMiddleware } from "../../../../utils/helpers/jwtMiddleware";
const send = require("../../../../utils/helpers/email");

const bcrypt = require("bcryptjs");
export default async function handler(req, res) {
    if (req.method !== "POST") return errorResponse(res, "Method Not Allowed", 405);
    const schema = Joi.object({
        userid : Joi.number().required(),
    });
    const payload = await jwtMiddleware(req, res);
    //check if payload contains businessid
    if (!payload.uid) return errorResponse(res, "You need to be logged in to access this route", 401);
    const { error } = schema.validate(req.body, { abortEarly: true });
    if (error) return errorResponse(res, error.details[0].message);
    try {
        //check if old password is correct
        let userid = req.body.userid;
        const user = await generaldb.singlerecord('users', 'id',userid);
        if (!user) return errorResponse(res, "User not found", 404);
        //genrate random password and send it to user
        const randomPassword = Math.random().toString(36).slice(-8);
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(randomPassword, salt);
       
        generaldb.update('users', 'id', userid, { password: hash });
        //send email to user with password
        const email = user.email;
        const subject = "Password Reset";
        const message = `<p>Hi ${user.firstname},</p>
        <p>Your password has been reset. Your new password is: <b>${randomPassword}</b></p>
        <p>Please login to your account and change your password.</p>
        <p>Thank you</p>`;
        send(email, subject, message);
        return successResponse(res, "Password has been reset successfully ask user to check mail.", {});
    } catch (error) {
        console.log(error);
        return errorResponse(res, "Failed to reset password", 500);
    }
}
