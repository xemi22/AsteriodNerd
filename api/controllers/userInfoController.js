import jwt from "jsonwebtoken";
import User from "../model/User.js";

const handleUserInfoRequest = async (req, res) => {
  let username = "";
  const authHeader = req.headers.authorization || req.headers.Authorization;

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    username = decoded.username;
  });
  const foundUser = await User.findOne({ username }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  else console.log(JSON.stringify(foundUser));
  res.json(foundUser);
};

export default handleUserInfoRequest;
