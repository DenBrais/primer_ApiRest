import { Router } from "express";
import { ProductosController } from "../controllers/ProductosController";

const ROUTES = Router();

ROUTES.use("/", ProductosController.getAllProducts);

export default ROUTES;
