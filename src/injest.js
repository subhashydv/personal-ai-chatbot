import { readFile } from './data-loader/readFile.js';
import { chunkText } from './chunk-creater/chunker.js';

export async function injestData(config, file) {
  const { embedder, collection } = config;
  const rawText = await readFile(file);
  const chunks = await chunkText(rawText);

  for (let i = 0; i < chunks.length; i++) {
    const emb = await embedder(chunks[i], { pooling: 'mean', normalize: true });
    await collection.add({
      ids: [String(i)],
      embeddings: [Array.from(emb.data)],
      documents: [chunks[i]],
    });
  }
};