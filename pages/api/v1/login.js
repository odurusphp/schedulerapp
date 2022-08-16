const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const generaldb = require("../../../database/db");
const lodash = require("lodash");
//const config = require("config");

export default async function handler(req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, x_auth_token"
  );

  if (req.method !== "POST") {
    res.status(405).send("Method Not Alllowed");
    return;
  }

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  // Checking data validation
  const { error } = schema.validate(req.body, { abortEarly: true });
  if (error) return res.status(400).send({ error: error.details[0].message });

  const usercount = await generaldb.recordcount(
    "users",
    "email",
    req.body.email
  );

  if (usercount === 0)
    return res.status(404).json({ error: "Email does not exit" });

  const userdetails = await generaldb.singlerecord(
    "users",
    "email",
    req.body.email
  );
  const userpassword = userdetails.password;
  const validPassword = await bcrypt.compare(req.body.password, userpassword);

  if (!validPassword)
    return res.status(401).json({ error: "Password is incorect" });

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
  res.status(200).json({ userdata, token });
}

function createWebToken(user) {
  const token = jwt.sign(user, process.env.JWT_SECRET);
  return token;
}
