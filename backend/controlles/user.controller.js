import User from "../models/user.model.js";

export const getUser = async (req, res) => {
  const { username } = req.params;

  if (!username) {
    return res.status(400).json({ message: "Username is required" });
  }

  try {
    const user = await User.findOne({ username });
    if (user) {
      const { hashedPassword, ...other } = user._doc;
      return res.status(200).json(other);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
