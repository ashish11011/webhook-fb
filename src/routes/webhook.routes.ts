import { Router } from "express";
import { facebookWebhookHandler } from "../controllers/facebookWehbook.controller.js";



const router = Router();

router.get("/fb", facebookWebhookHandler );

export default router;

