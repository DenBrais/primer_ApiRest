import "reflect-metadata";
import { DataSource } from "typeorm";
import { Usuarios } from "./entities/Usuarios";
import { Clientes } from "./entities/Clientes";
import { Categorias } from "./entities/Categorias";
import { Productos } from "./entities/Productos";
import { Factura } from "./entities/Factura";
import { DetalleFactura } from "./entities/DetalleFactura";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "4BraroApi2026", // ajusta
  //password: "4BraroDev2026",
  database: "braroapirest", // crea esta DB
  synchronize: false, // solo desarrollo
  logging: false,
  entities: [
    Clientes,
    Productos,
    Factura,
    DetalleFactura,
    Usuarios,
    Categorias,
  ],
});
