//get all users
import { errorResponse, successResponse,formatdate } from "../../../../utils/helpers/general";
const generaldb = require("../../../../database/db");
import { jwtMiddleware } from "../../../../utils/helpers/jwtMiddleware";


export default async function handler(req, res) {
  const payload = await jwtMiddleware(req, res);
  //check if payload contains uid
  if (!payload.uid) return errorResponse(res, "You need to be logged in to access this route", 401);
  const users = await generaldb.query(
    `SELECT   *  from users `   
    );
    //remove password from response
    users.forEach(user => {
      delete user.password;
      //format date
      user.created_on = formatdate(user.created_on);
    });
   successResponse(res, "Users retrieved successfully", users);
}