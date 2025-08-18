# 🧠 Personal AI Chatbot

An AI agent that answers questions based on your uploaded PDF or text files using local embeddings and Chroma DB.

## 🚀 Features

- Upload `.pdf` or `.txt` files
- Generate embeddings using `@xenova/transformers`
- Store vector data in local **Chroma DB**
- Ask questions based on your content
- Uses LLM to generate summarized responses

## ⚙️ How It Works

1. **/upload**  
   Upload a file → extract text → create embeddings → store in Chroma.

2. **/ask**  
   Ask a question → embed → search Chroma → send results to LLM → get answer.

## 📦 Stack

- Node.js + Express
- @xenova/transformers
- Chroma DB (local)
- Multer (for file upload)

## 🧪 Run Locally

```bash
npm install
docker run -d -p 8000:8000 ghcr.io/chroma-core/chroma:latest
npm start
