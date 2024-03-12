import express from "express";
import {
  createThread,
  deleteThread,
  getThread,
  getThreads,
} from "../controllers/threadController.js";

const router = express.Router();

router.post("/create-thread", createThread);
router.delete("/delete-thread/:id", deleteThread);
router.get("/threads/", getThreads);
router.get("/thread/:id", getThread);

export default router;
