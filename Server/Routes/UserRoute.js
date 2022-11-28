import express from "express";
import { deleteUser, getUser, upadateUser } from "../Controllers/UserController.js";

const router = express.Router();

router.get('/:id', getUser)
router.put('/:id', upadateUser)
router.delete('/:id', deleteUser)

export default router;