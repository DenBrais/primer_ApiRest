import { Router } from "express";
import categorias from "./categorias";
import usuarios from "./usuarios";
import clientes from "./clientes";
import productos from "./pruductos";

const ROUTES = Router();
ROUTES.use("/categorias", categorias);
ROUTES.use("/usuarios", usuarios);
ROUTES.use("/clientes", clientes);
ROUTES.use("/productos", productos);

export default ROUTES;
