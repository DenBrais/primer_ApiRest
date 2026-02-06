import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Productos } from "../entities/Productos";

export class ProductosController {
  // metodo crear
  static createProducto = async (req: Request, res: Response) => {
    // Lógica para crear un producto
    try {
      const { nombre, precio, stock } = req.body;
      // Aquí irían las validaciones y la lógica para guardar el producto

      //validaciones d eentrada
      if (!nombre || nombre.length === 0) {
        return res
          .status(400)
          .json({ message: "El nombre del producto es obligatorio" });
      }

      //precio no nulo, numwerico y mayor a 0
      if (
        precio === undefined ||
        isNaN(Number(precio)) ||
        Number(precio) <= 0
      ) {
        return res.status(400).json({
          message:
            "El precio del producto es obligatorio, debe ser un número y mayor a 0",
        });
      }

      //stock no nulo, numwerico y mayor o igual a 0
      if (stock === undefined || isNaN(Number(stock)) || Number(stock) < 0) {
        return res.status(400).json({
          message:
            "El stock del producto es obligatorio, debe ser un número y mayor o igual a 0",
        });
      }

      //reglas de negocio

      //reviso si el nombre del producto ya existe
      const repo = AppDataSource.getRepository(Productos);
      const productoExistente = await repo.findOneBy({ nombre: nombre });
      if (productoExistente) {
        return res
          .status(400)
          .json({ message: "El nombre del producto ya existe" });
      }

      const nuevoProducto = repo.create({
        nombre: nombre,
        precio: Number(precio),
        stock: Number(stock),
      });

      await repo.save(nuevoProducto);

      res.status(201).json({ message: "Producto creado exitosamente" });
    } catch (error) {
      return res.status(500).json({ message: "Error al crear el producto" });
    }
  };

  //metodo readall
  static getAllProductos = async (req: Request, res: Response) => {
    // Lógica para obtener todas los productos
    try {
      const repo = AppDataSource.getRepository(Productos);
      const productos = await repo.find();
      res.status(200).json(productos);
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al obtener los productos" });
    }
  };

  //metodo read one
  static getProductoById = async (req: Request, res: Response) => {
    // Lógica para obtener un producto por ID
    try {
      res.status(200).json({ message: "Obtener un producto por ID" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al obtener el producto por ID" });
    }
  };

  //metod update
  static updateProducto = async (req: Request, res: Response) => {
    // Lógica para actualizar un producto
    try {
      res.status(200).json({ message: "Actualizar un producto" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al actualizar el producto" });
    }
  };

  //metodo delete
  static deleteProducto = async (req: Request, res: Response) => {
    // Lógica para eliminar un producto
    try {
      res.status(200).json({ message: "Eliminar un producto" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al eliminar el producto" });
    }
  };
}
