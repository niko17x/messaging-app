import express from "express";
import {
  createThread,
  deleteThread,
  getThread,
  getThreads,
} from "../controllers/threadController.js";

const router = express.Router();

router.post("/create-thread", createThread);
router.post("/thread/", getThread);
router.get("/threads/", getThreads);
router.delete("/delete-thread/:id", deleteThread);

export default router;
