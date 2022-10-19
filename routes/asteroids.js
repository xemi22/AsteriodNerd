import express from "express";
const router=express.Router();
import handleAsteroidRequest from "../controllers/asteroidController.js";
//import verifyJWT from "../middleware/verifyJWT.js"
router.get("/",handleAsteroidRequest)

export default router