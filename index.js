import { createApp } from './src/app.js';
import { getOrCreateCollection } from "./src/DB/connection.js"
import OpenAI from "openai";
import { pipeline } from '@xenova/transformers';
import dotenv from "dotenv";
dotenv.config();

const { OPENAI_API_KEY, DB_CONNECTION, COLLECTION_NAME } = process.env;
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
const embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
const collection = await getOrCreateCollection(DB_CONNECTION, COLLECTION_NAME);

const config = { openai, embedder, collection };

const PORT = process.env.PORT || 8181;
const app = createApp(config);
app.listen(PORT, () => console.log(`Listening on ${PORT}`));