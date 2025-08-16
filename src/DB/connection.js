import { ChromaClient } from 'chromadb';

export async function getOrCreateCollection(dbConnection, collectionName) {
  const client = new ChromaClient({ url: dbConnection });

  let collection;
  try {
    collection = await client.getCollection({ name: collectionName });
  } catch {
    collection = await client.createCollection({
      name: collectionName,
      embeddingFunction: null,
    });
  }

  return collection;
} 