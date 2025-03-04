import { Router } from "express";
import { loginController } from "../controllers/admin.controllers.js";
import { verifyUser, isAdmin } from "../middlewares/auth.middlewares.js";

const router = Router();

// Routes
router.route("/login").post(loginController);

export default router;
