import express from "express";
import authRouter from "./routes/auth.js";
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

app.use("/", authRouter);
