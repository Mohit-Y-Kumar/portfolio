import express from 'express';
import {postTimeline,deleteTimeline,getallTimelines}
from '../controller/timelineController.js';
import { isAuthenticated } from '../middlewares/auth.js';
const router =express.Router();

router.post("/add",isAuthenticated,postTimeline);
router.delete("/delete/:id",isAuthenticated,deleteTimeline);

router.get("/getall",getallTimelines);



export default router;