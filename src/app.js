import express from "express";
import bodyParser from "body-parser";
import multer from "multer";
import { askQuestion } from "./query.js";
import morgan from "morgan";
import { injestData } from "./injest.js";

export const createApp = (config) => {
  const app = express();
  // const upload = multer({ dest: './DB/' });
  const upload = multer({ storage: multer.memoryStorage() });
  app.use(bodyParser.json());
  app.use(morgan('dev'));


  app.post("/ask", async (req, res) => {
    const { question } = req.body;
    const answer = await askQuestion(config, question);
    return res.json({ answer });
  });

  app.post("/upload", upload.single('file'), async (req, res) => {
    if (!req.file) {
      return res.status(400).send("No file received");
    }
    await injestData(config, req.file);
    res.status(200).send({ message: "File processed successfully" });
  });

  return app;
};
