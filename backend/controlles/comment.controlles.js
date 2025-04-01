import Comment from "../models/comment.model.js";

export const getComments = async (req, res) => {
  const pinId = req.query.pinId;

  if (!pinId) return res.status(400).json({ message: "pin_id is required!" });
  const comments = await Comment.find({ pin: pinId })
    .sort({ createdAt: -1 })
    .populate("user");

  res.status(200).json(comments);
};

export const createComment = async (req, res) => {
  const { pin, description } = req.body;

  if (!pin || !description)
    return res.status(400).json({ message: "All fields are required!" });

  try {
    const userId = req.userId;

    const comment = await Comment.create({ description, pin, user: userId });

    res.status(201).json(comment);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
