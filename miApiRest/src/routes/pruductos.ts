import { Router } from "express";
import { ProductosController } from "../controllers/ProductosController";

const ROUTES = Router();

ROUTES.post("/", ProductosController.createProducto);
ROUTES.get("/", ProductosController.getAllProductos);
ROUTES.get("/:id", ProductosController.getProductoById);
ROUTES.patch("/:id", ProductosController.updateProducto);
ROUTES.patch("/:id", ProductosController.reactivateProducto);
ROUTES.delete("/:id", ProductosController.deleteProducto);

export default ROUTES;
