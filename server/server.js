import express from "express";
import dotenv from "dotenv";
dotenv.config();
import db from "./config/db.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";

db();

const port = process.env.PORT || 5000;

const app = express();

app.use("/api/user", userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
  console.log(`Server initiated on port ${port}`);
});
