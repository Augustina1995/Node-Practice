import express from "express";
import attendeeRouter from "./attendeeRouter.js";
import eventRouter from "./eventRouter.js";

const router = express.Router();

router.use(attendeeRouter);
router.use(eventRouter);

export default router;

