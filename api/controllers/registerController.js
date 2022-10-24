import User from "../model/User.js"
import bcrypt from "bcrypt"


const handleNewUser = async (req, res) => {
  const {user,pwd } = req.body;
  if (!user || !pwd)
    return res
      .sendStatus(400)
      .json({ message: "Username and password are required." });
  // check for duplicate usernames in the db

  const duplicate = await User.findOne({ username: user }).exec();

  if (duplicate) return res.sendStatus(409); //Conflict
  try {
    //encrypt the password
    const hashedPwd = await bcrypt.hash(pwd, 10);
    //create and store the new user
    const result = await User.create({
      email:req.body.email,
      username: user,
      password: hashedPwd,
      name:req.body.name,
      lastname:req.body.lastname

    });

   
    res.status(201).json({ success: `New user ${user} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default handleNewUser;