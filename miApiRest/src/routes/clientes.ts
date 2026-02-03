import { Router } from "express";
import { ClientesController } from "../controllers/clientesController";

const ROUTES = Router();

ROUTES.use("/", ClientesController.getAllClients);

export default ROUTES;
