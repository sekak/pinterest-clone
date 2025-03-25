import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import JWT from "jsonwebtoken";
import Follow from "../models/follow.model.js";

export const registerUser = async (req, res) => {
  const { username, email, password, displayName } = req.body;

  if (!username || !email || !password || !displayName)
    return res.status(400).json({ message: "All fields are required" });

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await User.create({
      username,
      email,
      hashedPassword,
      displayName,
    });
    const { password, ...other } = user._doc;

    //JWT
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res.status(201).json(other);
  } catch (err) {
    if (err.code === 11000)
      return res
        .status(400)
        .json({ message: "Username or email already exists" });
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req, res) => {
  const body = req.body;

  if (!body.email || !body.password)
    return res.status(400).json({ message: "All fields are required" });

  try {
    const user = await User.findOne({ email: body.email }); // Use findOne instead of find
    if (!user)
      return res.status(404).json({ message: "Email or password wrong!" });

    const isPasswordCompare = await bcrypt.compare(
      body.password,
      user.hashedPassword
    );

    if (!isPasswordCompare)
      return res.status(400).json({ message: "Email or password wrong!" });

    //JWT
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
    });

    const { hashedPassword, ...other } = user._doc;
    return res.status(201).json(other);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutUser = async (req, res) => {
  res.clearCookie("token");
  return res.status(200).json({ message: "Logged out" });
};

export const getUser = async (req, res) => {
  const { username } = req.params;

  if (!username)
    return res.status(400).json({ message: "Username is required" });

  try {
    const user = await User.findOne({ username });
    if (user) {
      const { hashedPassword, ...other } = user._doc;

      const token = req.cookies.token;

      const followers = await Follow.countDocuments({ follower: user._id });
      const followings = await Follow.countDocuments({ following: user._id });

      if (!token) {
        return res
          .status(200)
          .json({ ...other, followers, followings, isFollowing: false });
      }
      JWT.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if (!err) {
          const isExist = await Follow.findOne({
            follower: user._id,
            following: payload.id,
          });
          return res
            .status(200)
            .json({
              ...other,
              followers,
              followings,
              isFollowing: isExist ? true : false,
            });
        }
      });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
