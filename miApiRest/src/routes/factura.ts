import { Router } from "express";
import { FacturaController } from "../controllers/FacturaController";
import { validateRequest } from "../middleware/validateRequest";
import { IdParamDto } from "../dtos/IdParamDto";
import { FacturaUpdateDto } from "../dtos/FacturaDto";

const ROUTES = Router();

ROUTES.get("/", FacturaController.getAllFacturas);
ROUTES.get(
  "/:id",
  validateRequest({ params: IdParamDto }),
  FacturaController.getFacturaById,
);
ROUTES.post(
  "/",
  validateRequest({ params: IdParamDto, body: FacturaUpdateDto }),
  FacturaController.createFactura,
);
ROUTES.patch(
  "/:id",
  validateRequest({ params: IdParamDto, body: FacturaUpdateDto }),
  FacturaController.updateFactura,
);
ROUTES.delete(
  "/:id",
  validateRequest({ params: IdParamDto }),
  FacturaController.deleteFactura,
);
export default ROUTES;
