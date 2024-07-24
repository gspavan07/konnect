import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import authRouter from "./routes/auth.js";
const port = process.env.PORT || 3000;

import connectMongoDB from "./mongodb.js";
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
const app = express();
app.use(express.json());
connectMongoDB();
app.use(express.static(path.join(__dirname, "/client/dist")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/dist/index.html"));
});
app.use("/api/", authRouter);
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
