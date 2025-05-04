import Pin from "../models/pin.model.js";
import Save from "../models/save.model.js";

export const getBoards = async (req, res) => {
  const userId = req.params.userId;
  const saves = await Save.find({ user: userId })
  
  const pins = await Promise.all(
    saves.map(async (save) => {
      const pin = await Pin.findById(save.pin);
      return pin;
    })
  )

  res.status(200).json(pins)
};
