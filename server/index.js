import express from "express";
import authRouter from "./routes/auth.js";
const port = process.env.PORT || 3000;

import connectMongoDB from "./mongodb.js";

const app = express();
app.use(express.json());
connectMongoDB();
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use("/api/", authRouter);
