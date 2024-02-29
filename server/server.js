import express from "express";
import dotenv from "dotenv";
dotenv.config();
import db from "./utils/db.js";

db();

const port = process.env.PORT || 5000;

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "recieved" });
});

app.listen(process.env.PORT, () => {
  console.log(`Server initiated on port ${port}`);
});
