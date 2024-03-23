import express from "express";
import cors from "cors";
import { router as index } from "./API/index";
import { router as user } from "./API/user";
import { router as main } from "./API/main";
import { router as image } from "./API/image";
import { router as image_upload } from "./API/index";
import bodyParser from "body-parser";

export const app = express();
app.use(
    cors({
      origin: "*",
    })
  );
app.use(bodyParser.json());
app.use("/", index);
app.use("/user", user);
app.use("/main", main);
app.use("/image", image);

app.use("/upload",image_upload);
app.use("/uploads", express.static("uploads"));

//---change if want to run as localhost
// module.exports = app;