import { Schema } from "mongoose";
import mongoose from "mongoose";

const schema = new Schema(
  {
    media: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
    height: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    link: {
      type: String,
    },
    board: {
      type: Schema.Types.ObjectId,
      ref: "Board",
    },
    tags: {
      type: [String],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      populate: {select: 'username img displayName'},
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Pin", schema);
