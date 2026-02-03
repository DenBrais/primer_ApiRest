import { Router } from "express";
import UsuariosController from "../controllers/UsuariosController";

const ROUTES = Router();

ROUTES.use("/", UsuariosController.getAllUsers);

export default ROUTES;
