import { Router } from "express";
import { ClientesController } from "../controllers/ClientesController";
import { validateRequest } from "../middleware/validateRequest";
import { IdClienteParamDto } from "../dtos/idClientParamDto";
import { ClienteCreateDto } from "../dtos/ClienteDto";

const ROUTES = Router();

ROUTES.get("/", ClientesController.getAllClientes);
ROUTES.get(
  "/:id",
  validateRequest({ params: IdClienteParamDto }),
  ClientesController.getClienteById,
);
ROUTES.post(
  "/ :id",
  validateRequest({ params: IdClienteParamDto, body: ClienteCreateDto }),
  ClientesController.createCliente,
);
ROUTES.patch("/:id", ClientesController.updateCliente);
ROUTES.patch("/:id", ClientesController.reactivateCliente);
ROUTES.delete("/:id", ClientesController.deleteCliente);
export default ROUTES;
