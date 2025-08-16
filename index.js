import readline from "readline";
import { pipeline } from '@xenova/transformers';
import OpenAI from "openai";
import dotenv from "dotenv";
import { getOrCreateCollection } from "./src/DB/connection.js"
import { askQuestion } from "./src/query.js"
dotenv.config();

const { OPENAI_API_KEY, DB_CONNECTION, COLLECTION_NAME } = process.env;
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
const embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
const collection = await getOrCreateCollection(DB_CONNECTION, COLLECTION_NAME);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on("line", async (input) => {
  if (input.toLowerCase() === "exit") {
    rl.close();
    process.exit(0);
  }
  console.log("\nQuestion : ", input);
  const result = await askQuestion(collection, embedder, openai, input);
  console.log(result);
  console.log("\n");
});
