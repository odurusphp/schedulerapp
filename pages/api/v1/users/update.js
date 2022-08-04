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
        title: Joi.string().optional(),
        firstname: Joi.string().required(),
        othernames: Joi.string().optional(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        role: Joi.string().required(),
        uid: Joi.number().optional(),
    });


    // Checking data validation
    const { error } = schema.validate(req.body, { abortEarly: true });
    // if (error) return res.status(400).send({ error: error.details[0].message });
    if (error) return errorResponse(res, error.details[0].message);
    const payload = await jwtMiddleware(req, res);
    //check if payload contains businessid
    if (!payload.uid) return errorResponse(res, "You need to be logged in to access this route", 401);
    let user ={  };
    let uid = payload.uid;
    //check if user is admin
    if(req.body.uid){
        if(payload.role !== "admin") return errorResponse(res, "You need to be an admin to access this route", 401);
         user = await generaldb.singlerecord("users", "id", req.body.uid);
         uid = req.body.uid;
    }else{
        user = await generaldb.singlerecord("users", "id", payload.uid);
    }
    if (!user) return errorResponse(res, "User not found", 404);
    //update user details
    const userdetails = {
        firstname: req.body.firstname,
        othernames: req.body.othernames,
        lastname: req.body.lastname,
        email: req.body.email,
        role: req.body.role,
        title: req.body.title,
    };
    generaldb.update("users", "id", req.body.uid, userdetails);
    //return success response
    return successResponse(res, "User details updated successfully", { userdetails });
}

