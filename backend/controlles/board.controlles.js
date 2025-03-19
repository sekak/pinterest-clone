import Boards from "../models/board.model.js";
import Pin from "../models/pin.model.js";

export const getBoards = async (req, res) => {
  const userId = req.params.userId;

  const boards = await Boards.find({ user: userId });

  const boardsWithPins = await Promise.all(
    boards.map(async (board) => {
      const countPin = await Pin.countDocuments({ board: board._id });
      const firstPin = await Pin.findOne({ board: board._id });

      return { ...board.toObject(), countPin, firstPin };
    })
  );

  res.status(200).json(boardsWithPins);
};
