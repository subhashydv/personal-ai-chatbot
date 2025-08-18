import express from "express";
import bodyParser from "body-parser";
import { askQuestion } from "./query.js";
import morgan from "morgan";

export const createApp = (config) => {
  const app = express();
  app.use(bodyParser.json());
  app.use(morgan('dev'));

  app.post("/ask", async (req, res) => {
    const { question } = req.body;
    const answer = await askQuestion(config, question);
    return res.json({ answer });
  });

  return app;
};
