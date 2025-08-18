import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function chunkText(text) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 100,
  });

  return await splitter.splitText(text);
};
