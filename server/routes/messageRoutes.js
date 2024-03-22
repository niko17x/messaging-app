import express from "express";
import {
  createMessage,
  deleteMessages,
  getMessage,
  getMessages,
} from "../controllers/messageController.js";

const router = express.Router();

router.post("/create", createMessage);
router.delete("/delete/:id", deleteMessages);
router.get("/:id", getMessages);
router.get("/:id", getMessage);

export default router;
