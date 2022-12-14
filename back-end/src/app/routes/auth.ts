import { Router } from "express";
import { AuthController } from "../controllers";

const AuthRoutes = Router();

AuthRoutes.post("/login", AuthController.login);

export { AuthRoutes };
