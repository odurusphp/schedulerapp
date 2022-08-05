require("dotenv").config();
const Joi = require("joi");
const generaldb = require("../../../../database/db");
import {
  errorResponse,
  successResponse,
  formatdate,
} from "../../../../utils/helpers/general";

export default async function handler(req, res) {
  const roomid = req.query.roomid;

  const room = await generaldb.singlerecord("rooms", "id", roomid);

  if (!room) return errorResponse(res, "Rooom not found", 404);

  successResponse(res, "User info retrieved successfully", { room });
}
