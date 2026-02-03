import { Router } from "express";
import { Categorias } from "../entities/Categorias";
import CategoriasController from "../controllers/categriasController";

const ROUTES = Router();

ROUTES.use("/", CategoriasController.getAllCategories);

export default ROUTES;
