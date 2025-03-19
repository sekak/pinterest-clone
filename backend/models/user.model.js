import { Schema } from "mongoose";
import mongoose from "mongoose";

const schema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    displayName: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    hashedPassword: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,

});


export default mongoose.model("User", schema);