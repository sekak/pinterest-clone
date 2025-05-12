import express from "express";
import userRouter from "./routes/user.router.js";
import boardRouter from "./routes/board.router.js";
import pinRouter from "./routes/pin.router.js";
import commentRouter from "./routes/comment.route.js";
import followRouter from "./routes/follow.router.js";
import connectDB from "./utils/connectDB.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

app.use(
  cors({
    origin: [
      "http://localhost:4173",
      "http://client:4173",
      "http://client:5173",
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use("/api/users", userRouter);
app.use("/api/boards", boardRouter);
app.use("/api/pins", pinRouter);
app.use("/api/comments", commentRouter);
app.use("/api/follow", followRouter);

app.listen(process.env.PORT, () => {
  connectDB();
});
