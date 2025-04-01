import Pin from "../models/pin.model.js";
import sharp from "sharp";
import Imagekit from "imagekit";

export const getPins = async (req, res) => {
  const pageNumber = Number(req.query.cursor) || 0;
  const search = req.query.search;
  const userId = req.query.userId;
  const boardId = req.query.boardId;
  const LIMIT = 21;

  const pins = await Pin.find(
    search ? {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { tags: { $in: [search] } },
      ],
    } : userId ? { user: userId } : boardId ? { board: boardId } : {}
  ).limit(LIMIT).skip(LIMIT * pageNumber);

  const hasNextPage = pins.length === LIMIT;
  res.status(200).json({ pins, nextCursor: hasNextPage ? pageNumber + 1 : null });
};

export const getPin = async (req, res) => {
  const id = req.params.id;
  const pin = await Pin.findOne({ _id: id }).populate("user");
  res.status(200).json(pin);
};

export const createPin = async (req, res) => {
  const { 
    title,
    description,
    link,
    board,
    tags,
    textOptions,
    canvasOptions,
    // newBoard
   } = req.body;
  const media = req.files.media

  if (!media, !title, !description) {
    return res.status(400).json("Please fill all fields");
  }

  const parsedTextOptions = JSON.parse(textOptions)
  const parsedCanvasOptions = JSON.parse(canvasOptions) 


  const metadata = await sharp(media.data).metadata();

  const originalOrientation =
    metadata.width < metadata.height ? "portrait" : "landscape";
  const originalAspectRatio = metadata.width / metadata.height;

  let clientAspectRatio;
  let width;
  let height;

  if (parsedCanvasOptions.size !== "original") {
    clientAspectRatio =
      parsedCanvasOptions.size.split(":")[0] /
      parsedCanvasOptions.size.split(":")[1];
  } else {
    parsedCanvasOptions.orientation === originalOrientation
      ? (clientAspectRatio = originalOrientation)
      : (clientAspectRatio = 1 / originalAspectRatio);
  }

  width = metadata.width;
  height = metadata.width / clientAspectRatio;

  const imagekit = new Imagekit({
    publicKey: process.env.IK_PUBLIC_KEY,
    privateKey: process.env.IK_PRIVATE_KEY,
    urlEndpoint: process.env.IK_URL_ENDPOINT,
  });

  const textLeftPosition = Math.round((parsedTextOptions.left * width) / 375);
  const textTopPosition = Math.round(
    (parsedTextOptions.top * height) / parsedCanvasOptions.height
  );
  let croppingStrategy = "";

  if (parsedCanvasOptions.size !== "original") {
    if (originalAspectRatio > clientAspectRatio) {
      croppingStrategy = ",cm-pad_resize";
    }
  } else {
    if (
      originalOrientation === "landscape" &&
      parsedCanvasOptions.orientation === "portrait"
    ) {
      croppingStrategy = ",cm-pad_resize";
    }
  }

  const transformationString = `w-${width},h-${height}${croppingStrategy},bg-${parsedCanvasOptions.backgroundColor.substring(
    1
  )}${
    parsedTextOptions.text
      ? `,l-text,i-${parsedTextOptions.text},fs-${
          parsedTextOptions.fontSize * 2.1
        },lx-${textLeftPosition},ly-${textTopPosition},co-${parsedTextOptions.color.substring(
          1
        )},l-end`
      : ""
  }`;

  imagekit
    .upload({
      file: media.data,
      fileName: media.name,
      folder: "pins",
      transformation: {
        pre: transformationString,
      },
    })
    .then(async (response) => {
      // FIXED: ADD NEW BOARD
      let newBoardId;

      // if (newBoard) {
      //   const res = await Board.create({
      //     title: newBoard,
      //     user: req.userId,
      //   });
      //   newBoardId = res._id;
      // }

      console.log(board)

      const newPin = await Pin.create({
        user: req.userId,
        title,
        description,
        link: link || null,
        board:  '67d5bec40039cb3d8289f414',
        tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
        media: response.filePath,
        width: response.width,
        height: response.height,
      });
      return res.status(201).json(newPin);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
}