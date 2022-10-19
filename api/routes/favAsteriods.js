import express from "express";
const router = express.Router();
import {handleFavAsteriodRequest,addFavAsteriod,rmFavAsteriod}   from "../controllers/favAsteriodControllers.js";


router.get("/", handleFavAsteriodRequest);
router.post("/rm/:asteriodId",rmFavAsteriod);
router.post("/add/:asteriodId",addFavAsteriod)

export default router