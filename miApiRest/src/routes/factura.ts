import { Router } from "express";
import { FacturaController } from "../controllers/FacturaController";

const ROUTES = Router();

ROUTES.get("/", FacturaController.getAllFacturas);
ROUTES.get("/:id", FacturaController.getFacturaById);
ROUTES.post("/", FacturaController.createFactura);
ROUTES.patch("/:id", FacturaController.updateFactura);
ROUTES.delete("/:id", FacturaController.deleteFactura);
export default ROUTES;
