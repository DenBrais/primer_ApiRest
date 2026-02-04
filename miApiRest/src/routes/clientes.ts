import { Router } from "express";
import { ClientesController } from "../controllers/clientesController";

const ROUTES = Router();

ROUTES.get("/", ClientesController.getAllClientes);
ROUTES.get("/:id", ClientesController.getClienteById);
ROUTES.post("/ :id", ClientesController.createCliente);
ROUTES.patch("/:id", ClientesController.updateCliente);
ROUTES.delete("/:id", ClientesController.deleteCliente);
export default ROUTES;
