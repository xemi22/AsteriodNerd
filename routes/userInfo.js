import express from "express";
const router =express.Router();
import handleUserInfoRequest from "../controllers/userInfoController.js";

router.get("/",handleUserInfoRequest)

export default router;