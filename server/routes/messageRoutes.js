import express from "express";
import {
  createMessage,
  deleteMessage,
  getMessages,
  getMessagesFromUser,
} from "../controllers/messageController.js";

const router = express.Router();

router.post("/create-message", createMessage);
router.delete("/delete-message/:id", deleteMessage);
router.get("/all-messages", getMessages);
router.get("/all-messages/:id", getMessagesFromUser);

export default router;
