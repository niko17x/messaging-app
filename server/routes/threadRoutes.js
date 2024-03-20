import express from "express";
import {
  createThread,
  deleteThread,
  getThread,
  getThreads,
} from "../controllers/threadController.js";

const router = express.Router();

router.post("/create", createThread);
router.get("/threads/", getThreads);
router.delete("/delete/:id", deleteThread);
router.get("/:id", getThread);

export default router;
