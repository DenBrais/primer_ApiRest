import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const ROUTES = Router();

// Add your auth routes here
ROUTES.post("/login", AuthController.login);

export default ROUTES;
