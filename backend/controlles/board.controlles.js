import Pin from "../models/pin.model.js";
import Save from "../models/save.model.js";

export const getBoards = async (req, res) => {
  const userId = req.params.userId;

  // const boards = await Boards.find({ user: userId });

  // const boardsWithPins = await Promise.all(
  //   boards.map(async (board) => {
  //     const countPin = await Pin.countDocuments({ board: board._id });
  //     const firstPin = await Pin.findOne({ board: board._id });

  //     return { ...board.toObject(), countPin, firstPin };
  //   })
  // );
  // res.status(200).json(boardsWithPins);
  const saves = await Save.find({ user: userId })
  
  const pins = await Promise.all(
    saves.map(async (save) => {
      const pin = await Pin.findById(save.pin);
      return pin;
    })
  )

  console.log(pins)
  res.status(200).json(pins)
};
