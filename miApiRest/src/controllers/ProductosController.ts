import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Productos } from "../entities/Productos";

export class ProductosController {
  // metodo crear
  static createProducto = async (req: Request, res: Response) => {
    try {

      //destructuro los datos del body
      const { nombre, precio, stock } = req.body;

      /*validaciones de entrada*/

        //valido nombre no nulo y no vacio
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

      /*reglas de negocio*/

        //valido si el nombre del producto ya existe
        const repo = AppDataSource.getRepository(Productos);
        const productoExistente = await repo.findOneBy({ nombre: nombre });
        if (productoExistente) {
          return res
            .status(400)
            .json({ message: "El nombre del producto ya existe" });
        }
      //si no existe el producto, lo creo  
      const nuevoProducto = repo.create({
        nombre: nombre,
        precio: Number(precio),
        stock: Number(stock),
      });

      //guardo el nuevo producto en la base de datos
      await repo.save(nuevoProducto);

      //notifico que el producto se creó exitosamente
      res.status(201).json({ message: "Producto creado exitosamente", producto: nuevoProducto });

    } catch (error) {
      return res.status(500).json({ message: "Error al crear el producto" });
    }
  };

  //metodo readall
  static getAllProductos = async (req: Request, res: Response) => {
    // Lógica para obtener todas los productos
    try {
      //busco el producto en la base de datos
      const repo = AppDataSource.getRepository(Productos);
      const productos = await repo.find({ where: { estado: true } });

      //valido si hay productos registrados
      if (productos.length === 0) {
        return res
          .status(404)
          .json({ message: "No hay productos registrados" });
      }

      res.status(200).json({ message: "Lista de productos", productos: productos });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al obtener los productos" });
    }
  };

  //metodo read one
  static getProductoById = async (req: Request, res: Response) => {
    try {
      //destructuro el id en los parámetros
      const { id } = req.params;

      // accedo al repositorio de productos
      const repo = AppDataSource.getRepository(Productos);
      //busco el producto por id
      const producto = await repo.findOneBy({ id: Number(id), estado: true });

      //valido si el producto existe
      if (!producto) {
        return res
          .status(404)
          .json({ message: `El producto con id ${id} no existe` });
      }

      res.status(200).json({ message: "Producto encontrado", producto: producto });

    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al obtener el producto por ID" });
    }
  };

  //metod update
  static updateProducto = async (req: Request, res: Response) => {
    try {
      //destructuro el id en los parámetros
      const { id } = req.params;

      //destructuro los datos del body
      const { nombre, precio, stock } = req.body;

      /*validaciones de entrada*/
        //valido nombre no nulo y no vacio
        if (nombre !== undefined && nombre.length === 0) {
          return res
            .status(400)
            .json({ message: "El nombre del producto no puede estar vacío" });
        }

        //precio numwerico y mayor a 0    
        if (precio !== undefined && (isNaN(Number(precio)) || Number(precio) <= 0)) {
          return res.status(400).json({
            message:
              "El precio del producto debe ser un número y mayor a 0",
          });
        }

        //stock numerico y mayor a 0
        if (stock !== undefined && (isNaN(Number(stock)) || Number(stock) < 0)) {
          return res.status(400).json({
            message:
              "El stock del producto debe ser un número y mayor o igual a 0",
          });
        }
      /*reglas de negocio */  
      //valido si existe el producto que quiero actualizar
      const repo = AppDataSource.getRepository(Productos);
      const productoToUpdate = await repo.findOneBy({ id: Number(id), estado: true });

      //valido si el producto existe
      if (!productoToUpdate) {
        return res
          .status(404)
          .json({ message: `El producto con id ${id} no existe` });
      }

      //valido si el nuevo nombre ya existe en otro producto
      if (nombre !== undefined && nombre !== productoToUpdate.nombre) {
        const productoConMismoNombre = await repo.findOneBy({ nombre: nombre, estado: true });
        if (productoConMismoNombre) {
          return res
            .status(400)
            .json({ message: "El nombre del producto ya existe" });
        }
      }

      //si el producto existe y el nuevo nombre no existe en otro producto, lo actualizo
      productoToUpdate.nombre = nombre;
      productoToUpdate.precio = precio;
      productoToUpdate.stock = stock;

      //guardo los cambios en la base de datos
      await repo.save(productoToUpdate);

      //notifico que el producto se actualizó exitosamente
      res.status(200).json({ message: "Producto actualizado exitosamente", producto: productoToUpdate });
            
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
      //destructuro el id en los parámetros
      const { id } = req.params;

      /*Validaciones de entrada */
        //valido id obligatorio y numérico
        if (!id || isNaN(Number(id))) {
          return res.status(400).json({
            message: "El id del producto es obligatorio y debe ser un número",
          });
        }

      /*reglas de negocio*/

        // accedo al repositorio de productos
        const repo = AppDataSource.getRepository(Productos);
        const producto = await repo.findOneBy({ id: Number(id), estado: true });

        //valido si el producto existe
        if (!producto) {
          return res
            .status(404)
            .json({ message: `El producto con id ${id} no existe` });
        }

      //hago soft delete (eliminar lógicamente) cambiando el estado a false
      producto.estado = false;
      await repo.save(producto);

      //notifico que el producto se eliminó exitosamente
      res.status(200).json({ message: "Producto eliminado exitosamente" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al eliminar el producto" });
    }
  };

  //metodo reactivar producto
  static reactivateProducto = async (req: Request, res: Response) => {
    try {
      //destructuro el id en los parámetros
      const { id } = req.params;
      /*Validaciones de entrada */
        //valido id obligatorio y numérico
        if (!id || isNaN(Number(id))) {
          return res.status(400).json({
            message: "El id del producto es obligatorio y debe ser un número",
          });
        }

      // accedo al repositorio de productos
      const repo = AppDataSource.getRepository(Productos);
      const productoToActivate = await repo.findOneBy({ id: Number(id), estado: false });

      //valido si el producto existe y está inactivo
      if (!productoToActivate) {
        return res
          .status(404)
          .json({ message: `El producto con id ${id} no existe o ya está activo` });
      }
      //reactivo el producto
      productoToActivate.estado = true;
      await repo.save(productoToActivate);
      //notifico que el producto se reactivó exitosamente
      res.status(200).json({ message: "Producto reactivado exitosamente" });  
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error al reactivar el producto" });
    }
  };
    
}
