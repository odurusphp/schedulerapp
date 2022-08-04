require("dotenv").config();
const jwt = require("jsonwebtoken");

export function jwtMiddleware(req, res) {
  const authToken = req.headers;
  //console.log("authToken", authToken);
  // console.log("authToken", authToken);
  // const cookie = authToken.cookie;
  // console.log("cookie", cookie.split(";"));
  if (authToken.x_auth_token === "") {
    return res.status(400).json({message:"Token cannot be empty"});
  }

  if (!authToken.x_auth_token) {
    return res.status(404).json({message:"Authorization token not found"});
  }

  //decode Token
  try {
    const jwtDecoded = jwt.verify(
      authToken.x_auth_token,
      process.env.JWT_SECRET
    );
      return jwtDecoded;
    
  } catch (err) {
    console.log("err", err);
    return res.status(403).json({message:"Invalid Token Passed"});
  }
}

exports.module = jwtMiddleware;