import app from "./app.js"
import dotenv from 'dotenv'
import mongoose from "mongoose";
dotenv.config()

const { HOST_DB: uriDb } = process.env;
const connection = mongoose.connect(uriDb);

async function startServer() {
  try {
    await connection;
    console.log('DB connected')
    app.listen(3000, function () {
      console.log("Server running. Use our API on port: 3000")
    })
  } catch (err) {
    console.log("DB not connected, shutting down");
    process.exit(1);
  }
}
startServer();