const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const generaldb = require("../../../../database/db");
const lodash = require("lodash");
const send = require("../../../../utils/helpers/email");
import {
  errorResponse,
  successResponse,
} from "../../../../utils/helpers/general";
import { jwtMiddleware } from "../../../../utils/helpers/jwtMiddleware";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Alllowed");
    return;
  }

  const schema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    role: Joi.string().required(),
  });

  //const payload = await jwtMiddleware(req, res);
  //check if payload contains businessid
  // if (!payload.uid)
  //   return errorResponse(
  //     res,
  //     "You need to be logged in to access this route",
  //     401
  //   );
  //check if user is admin
  // if (payload.role !== "admin")
  //   return errorResponse(
  //     res,
  //     "You need to be an admin to access this route",
  //     401
  //   );
  // Checking data validation
  const { error } = schema.validate(req.body, { abortEarly: true });
  // if (error) return res.status(400).send({ error: error.details[0].message });
  if (error) return errorResponse(res, error.details[0].message);
  // Checking if user already exists
  const user = await generaldb.singlerecord("users", "email", req.body.email);
  if (user) return errorResponse(res, "User already exists", 409);
  //generate 6 word random password for user and add to database
  const password = Math.random().toString(36).slice(2, 8);

  //generate a salt
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const userdetails = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: hashedPassword,
    role: req.body.role,
  };
  generaldb.add("users", userdetails);
  //send email to user with password
  let message = `Hi ${userdetails.firstname},
    <br>
    <br>
    Your password is ${password}. Please login into the system
    <br>
    <br>
    Thank you.
    <br>`;
  let subject = "Account  Created Successfully";
  send(userdetails.email, subject, message);

  const userdata = lodash.pick(userdetails, [
    "title",
    "firstname",
    "lastname",
    "othernames",
    "role",
    "email",
    "id",
  ]);
  const token = createWebToken({ uid: userdetails.id, role: userdetails.role });
  return successResponse(res, "User created successfully", { userdata, token });
}

function createWebToken(user) {
  const token = jwt.sign(user, process.env.JWT_SECRET);
  return token;
}
