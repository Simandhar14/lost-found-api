import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import connectdb from "./Database/connect.js";
import mainRouter from "./Routes/mainRouter.js";

const app = express();
app.use(express.json());
app.use(cors());

app.use("/floo", mainRouter);

const PORT = process.env.PORT || 5000;

connectdb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
  });
