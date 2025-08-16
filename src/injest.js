import { loadPDF } from './data-loader/pdfReader.js';
import { chunkText } from './chunk-creater/chunker.js';
import { pipeline } from '@xenova/transformers';
import { getOrCreateCollection } from "./DB/connection.js"
import dotenv from "dotenv";
dotenv.config();

async function injestData() {
  const { DB_CONNECTION, COLLECTION_NAME } = process.env;
  const rawText = await loadPDF("../data/SubhashResumeWork.pdf");
  const chunks = await chunkText(rawText);

  const embedder = await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
  const collection = getOrCreateCollection(COLLECTION_NAME, DB_CONNECTION);

  for (let i = 0; i < chunks.length; i++) {
    const emb = await embedder(chunks[i], { pooling: 'mean', normalize: true });
    await collection.add({
      ids: [String(i)],
      embeddings: [Array.from(emb.data)],
      documents: [chunks[i]],
    });
  }
}

injestData();
