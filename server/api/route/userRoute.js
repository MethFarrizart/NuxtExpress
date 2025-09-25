import express from "express";
import { register, logIn, logOut } from "../controller/UserController.js";

const router = express.Router();

router.post("/register", register);
router.post("/log_in", logIn);
router.post("/log_out", logOut);

export default router;
