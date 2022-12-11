import express from 'express';

const router = express.Router()

router.post("/", createChat)
router.get("/:userId", userChats)
router.get("/find/:firstId/:secondId", findChat)

export default router