import User from "../model/User.js";
import jwt from "jsonwebtoken";

const handleRefreshToken = async (req, res) => {
  console.log("got to the cookies");
  const cookies = req.cookies;
 
  if (!cookies?.jwt) return res.sendStatus(401);
  const refreshToken = cookies.jwt;
  
  console.log("there is a cookie");
  const foundUser = await User.findOne({ refreshToken }).exec();

  if (!foundUser) return res.sendStatus(403); //Forbidden
  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.username !== decoded.username)
      return res.sendStatus(403);
    // roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      { username: decoded.username},
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ accessToken });
  });
};

export default handleRefreshToken;
