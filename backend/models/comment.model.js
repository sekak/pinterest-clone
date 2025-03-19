import { Schema } from "mongoose";
import mongoose from "mongoose";

const schema = new Schema(
  {
    description: {
      type: String,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    pin: {
      type: Schema.Types.ObjectId,
      ref: "Pin",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Comment", schema);
