import express from "express";
import cors from "cors";
import { router as index } from "./API/index";
import { router as user } from "./API/user";
import { router as main } from "./API/main";
import { router as image } from "./API/image";
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

module.exports = app;