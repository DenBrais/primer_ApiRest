import { Router } from "express";
import { Categorias } from "../entities/Categorias";
import CategoriasController from "../controllers/CategriasController";

const ROUTES = Router();

ROUTES.get("/", CategoriasController.getAllCategories);
ROUTES.get("/:id", CategoriasController.getCategoryById);
ROUTES.post("/", CategoriasController.createCategories);
ROUTES.patch("/:id", CategoriasController.updateCategories);
ROUTES.delete("/:id", CategoriasController.deleteCategories);
export default ROUTES;
