import { Router } from "express";
import { ProductosController } from "../controllers/ProductosController";
import { validateRequest } from "../middleware/validateRequest";
import { IdParamDto } from "../dtos/IdParamDto";
import { ProductoCreateDto, ProductoUpdateDto } from "../dtos/ProductoDto";

const ROUTES = Router();

ROUTES.post(
  "/",
  validateRequest({ body: ProductoCreateDto }),
  ProductosController.createProducto,
);

ROUTES.get("/", ProductosController.getAllProductos);
ROUTES.get(
  "/:id",
  validateRequest({ params: IdParamDto }),
  ProductosController.getProductoById,
);
ROUTES.patch(
  "/:id",
  validateRequest({ params: IdParamDto, body: ProductoUpdateDto }),
  ProductosController.updateProducto,
);
ROUTES.patch(
  "/:id",
  validateRequest({ params: IdParamDto, body: ProductoUpdateDto }),
  ProductosController.reactivateProducto,
);
ROUTES.delete(
  "/:id",
  validateRequest({ params: IdParamDto }),
  ProductosController.deleteProducto,
);

export default ROUTES;
