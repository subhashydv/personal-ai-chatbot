export async function askQuestion(config, question) {
  const { openai, embedder, collection } = config;
  const embeddedQuery = await embedder(question, { pooling: 'mean', normalize: true });

  const result = await collection.query({
    queryEmbeddings: [Array.from(embeddedQuery.data)],
    nResults: 5,                          // top 5 most similar docs
  });

  const context = result.documents[0].join("\n");

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are a personal knowledge assistant. Use only the provided context to answer."
      },
      {
        role: "user",
        content: `Context:\n${context}\n\nQuestion: ${question}`
      }
    ]
  });

  return completion.choices[0].message.content;
};
