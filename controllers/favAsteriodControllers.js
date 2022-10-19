import jwt from "jsonwebtoken";
import User from "../model/User.js";
export const handleFavAsteriodRequest = async (req, res) => {
  let username = "";
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    username = decoded.username;
  });
  const foundUser = await User.findOne({ username }).exec();
  if (!foundUser) return res.sendStatus(401); //Unauthorized
  else res.json(foundUser.favoriteAsteroids);
};
export const addFavAsteriod = async (req, res) => {
  console.log("adding an asteriod");
  let username = "";
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    username = decoded.username;
  });
  const foundUser = await User.findOneAndUpdate(
    { username },
    {
      $push: {
        favoriteAsteroids: {
          asteriodId: req.body.asteriodId,
          asteriodName: req.body.asteriodName,
          asteriodInfo: req.body.asteriodInfo,
        },
      },
    }
  ).exec();
  const updatedUser = await User.findOne({ username });
  res.json(updatedUser);
};

export const rmFavAsteriod = async (req, res) => {
  console.log("removing and asteriod");
  const rmAsteriodId = req.body.asteriodId;
  let username = "";
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403); //invalid token
    username = decoded.username;
  });
  const foundUser = await User.findOneAndUpdate(
    { username },
    {
      $pull: { favoriteAsteroids: { asteriodId:rmAsteriodId } } 
    }
  ).exec();
  const updatedUser = await User.findOne({ username });
  res.json(updatedUser);
};
