import { Router } from "express";
import categorias from "./categorias";
import usuarios from "./usuarios";
import clientes from "./clientes";
import productos from "./pruductos";
import auth from "./Auth";

const ROUTES = Router();
ROUTES.use("/categorias", categorias);
ROUTES.use("/usuarios", usuarios);
ROUTES.use("/clientes", clientes);
ROUTES.use("/productos", productos);
ROUTES.use("/auth", auth);

export default ROUTES;
