# 🧠 Personal AI Chatbot

An AI agent that answers questions based on your uploaded PDF or text files using local embeddings and Chroma DB.

**For more details, refer this [blog post](https://subhashydv.github.io/blog/2025/09/agentic-ai-personal-rag-system/)**.

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

### Install chromadb

You need to have ChromaDB running locally. You can set it up using either of the following methods:

option 1: (if you have python installed)
```bash
pip install chromadb
chroma start
```

option 2: (using docker)
```bash
docker run -d -p 8000:8000 chromadb/chroma:latest
```

### Install dependencies

```bash
npm install
```
create a `.env` file in the root directory and add following environment variables:
```
OPENAI_API_KEY=your_openai_api_key
DB_CONNECTION=http://localhost:8000
COLLECTION_NAME=my_docs
```

### Start the server

```bash
npm start
```

### Test the endpoints
Use Postman or curl to test the endpoints:
- Upload a file:
  ```bash
  curl -X POST -F "file=@path/to/your/file.pdf" http://localhost:3000/upload
  ```
- Ask a question:
  ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"question": "Your question here"}' http://localhost:3000/ask
    ```
  
- You should get a response with the answer based on your uploaded content.


## Running it with MCP Server (optional) : setup with vscode & github-copilot

1. Create a file name `mcp.json` in the .vscode directory from root with following content:
```json
{
   "servers": {
      "personal-ai-chatbot": {
         "type": "stdio",
         "command": "node",
         "args": [
            "<Dir_Path>/personal-ai-chatbot/mcp/server.js"
         ]
      }
   }
}
```

2. In the above snippet update the <Dir_Path> with your local directory path.
3. Restart the vscode.
4. Register the personal-ai-chatbot server in github-copilot chat window using the `mcp.json` file created above.
5. Then run the command `npm start` from mcp directory.
6. Once server is up, then set this prompt in the github-copilot chat window to use this personal-ai-chatbot:
```save this instruction in your memory: Whenenver needed use askQuestion tool.``` 
7. Now you can use the personal-ai-chatbot from github-copilot chat window but make sure you have uploaded the files using the upload endpoint before asking any questions.
