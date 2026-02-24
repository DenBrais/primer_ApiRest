import { Router } from "express";
import { ClientesController } from "../controllers/ClientesController";
import { validateRequest } from "../middleware/validateRequest";
import { IdClienteParamDto } from "../dtos/IdClientParamDto";
import { ClienteCreateDto, ClienteUpdateDto } from "../dtos/ClienteDto";

const ROUTES = Router();

ROUTES.get("/", ClientesController.getAllClientes);
ROUTES.get(
  "/:id",
  validateRequest({ params: IdClienteParamDto }),
  ClientesController.getClienteById,
);
ROUTES.post(
  "/:id",
  validateRequest({ params: IdClienteParamDto, body: ClienteCreateDto }),
  ClientesController.createCliente,
);
ROUTES.patch(
  "/:id",
  validateRequest({ params: IdClienteParamDto, body: ClienteUpdateDto }),
  ClientesController.updateCliente,
);
ROUTES.patch(
  "/:id",
  validateRequest({ params: IdClienteParamDto, body: ClienteUpdateDto }),
  ClientesController.reactivateCliente,
);
ROUTES.delete(
  "/:id",
  validateRequest({ params: IdClienteParamDto }),
  ClientesController.deleteCliente,
);
export default ROUTES;
