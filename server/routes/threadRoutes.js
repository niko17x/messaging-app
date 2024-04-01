import express from "express";
import {
  createThread,
  deleteThread,
  getFirstThread,
  getThread,
  getThreads,
} from "../controllers/threadController.js";

const router = express.Router();

router.post("/create", createThread);
router.get("/all-threads/:id", getThreads);
router.get("/first-thread/:id", getFirstThread);
router.delete("/delete/:id", deleteThread);
router.get("/:id", getThread);

export default router;
