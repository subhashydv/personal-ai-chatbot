import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";

export async function chunkText(text) {
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    chunkOverlap: 50,
  });

  return await splitter.splitText(text);
};
