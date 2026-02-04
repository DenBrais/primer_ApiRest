import { Router } from "express";
import { Categorias } from "../entities/Categorias";
import CategoriasController from "../controllers/CategriasController";
import { validateRequest } from "../middleware/validateRequest";
import { CategoriaCreateDto } from "../dtos/CategoriaDto";
import { CategoriaUpdateDto } from "../dtos/CategoriaDto";
import { IdParamDto } from "../dtos/IdParamDto";

const ROUTES = Router();

ROUTES.get("/", CategoriasController.getAllCategories);
ROUTES.get(
  "/:id",
  validateRequest({ params: IdParamDto }),
  CategoriasController.getCategoryById,
);
ROUTES.post(
  "/",
  validateRequest({ body: CategoriaCreateDto }),
  CategoriasController.createCategories,
);
ROUTES.patch(
  "/:id",
  validateRequest({ params: IdParamDto, body: CategoriaUpdateDto }),
  CategoriasController.updateCategories,
);
ROUTES.delete(
  "/:id",
  validateRequest({ params: IdParamDto }),
  CategoriasController.deleteCategories,
);
export default ROUTES;
