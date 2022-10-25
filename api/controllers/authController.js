import User from "../model/User.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


const handleLogin = async (req, res) => {
  const { user, pwd } = req.body;
  
  if (!user || !pwd)
    return res
      .status(400)
      .json({ message: "Username and password are required." });
  const foundUser = await User.findOne({ username: user }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  // evaluate password
  const match = await bcrypt.compare(pwd, foundUser.password);
  if (match) {
    // const roles = Object.values(foundUser.roles);

    // create JWTs
    const accessToken = jwt.sign(
      {  username: foundUser.username },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      { username: foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
     
    // Saving refreshToken with current user

    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();
    console.log("assigned user a refresh token and access token");
    console.log(refreshToken)

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge:  15 * 60 * 1000,
    });
    res.json({ accessToken });
  } else {
    res.sendStatus(401);
  }
};  

export default handleLogin;