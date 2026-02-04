import { Request, Response } from "express";
import { AppDataSource } from "../data-source";

class CategoriasController {
  // Métodos del controlador de categorías

  //metodo Create
  static createCategories = async (req: Request, res: Response) => {
    try {
      //destructuro los datos del body
      const { nombre, descripcion } = req.body;

      //validaciones
      if (!nombre || nombre.length === 0) {
        return res
          .status(400)
          .json({ message: "El nombre de la categoría es obligatorio" });
      }

      //reglas de negocio
      //nombre debe ser único
      const repo = AppDataSource.getRepository("Categorias");
      const categoriaExistente = await repo.findOneBy({ nombre: nombre });
      if (categoriaExistente) {
        return res.status(400).json({ message: "El nombre de la categoría ya existe" });
      }

      //accedo al repositorio de categorías
      //const repo = AppDataSource.getRepository("Categorias");
      const nuevaCategoria = repo.create({
        nombre: nombre,
        descripcion: descripcion,
        estado: true,
      });
      await repo.save(nuevaCategoria);

      return res.status(201).json(nuevaCategoria);

      
    } catch (error) {
      return res.status(500).json({ message: "Error al crear la categoría" });
    }
  };

  //metodo read all
  static getAllCategories = async (req: Request, res: Response) => {
    // Lógica para obtener todas las categorías
    try {
      const repo=AppDataSource.getRepository("Categorias");
      const ListaCategorias=await repo.find({where:{estado:true}});
      
      if(ListaCategorias.length===0){
        return res.status(404).json({message:"No hay categorias registradas"});
      }

      return res.status(200).json(ListaCategorias);

      
    } catch (error) {
      return res.status(500).json({ message: "Error al obtener las categorías" });
    }
  };

  //metodo read one
  static getCategoryById = async (req: Request, res: Response) => {
    
    try {

      //destructuración del id en este caso en los parámetros
      const {id} = req.params;

      //validar si el id viene vacío o no es un número
      if(!id || isNaN(Number(id))){
        return res.status(400).json({message:"El id de la categoría es obligatorio y debe ser un número"});
      }

      // accedo al repositorio de categorías
      const repo=AppDataSource.getRepository("Categorias");
      const categoria=await repo.findOneBy({id: Number(id), estado:true});

      if(!categoria){
        return res.status(404).json({message:`La categoría con id ${id} no existe`});
      }
      
      res.status(200).json(categoria);

    } catch (error) {
      return res.status(500).json({ message: "Error al obtener la categoría" });
    }
  };

  //metodo update
  static updateCategories = async (req: Request, res: Response) => {
    try {
      //destructuración del id en este caso en los parámetros
      const {id} = req.params;

      //destructuración del body
      const {nombre, descripcion} = req.body;

      //validaciones de entrada
      if(!id || isNaN(Number(id))){
        return res.status(400).json({message:"El id de la categoría es obligatorio y debe ser un número"});
      }

      if(!nombre || nombre.length===0){
        return res.status(400).json({message:"El nombre de la categoría es obligatorio"});
      }

      //accedo al repositorio de categorías
      const repo=AppDataSource.getRepository("Categorias");
      const categoriaExistente=await repo.findOneBy({id: Number(id), estado:true});

      //verifico si la categoría existe
      if(!categoriaExistente){
        return res.status(404).json({message:`La categoría con id ${id} no existe`});
      }

      //verifico si el nuevo nombre ya existe en otra categoría
      const categoriaConMismoNombre=await repo.findOneBy({nombre:nombre});
      if(categoriaConMismoNombre){
        return res.status(400).json({message:"El nombre de la categoría ya existe"});
      }

      //actualizo los datos
      categoriaExistente.nombre=nombre;
      categoriaExistente.descripcion=descripcion;

      //guardo los cambios
      await repo.save(categoriaExistente);

      //devuelvo la categoría actualizada
      return  res.status(200).json(categoriaExistente);
      
    } catch (error) {
      return res.status(500).json({ message: "Error al actualizar la categoría" });
    }
  };

  //metodo delete
  static deleteCategories = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      //validaciones de entrada
      if (!id || isNaN(Number(id))) {
        return res
          .status(400)
          .json({ message: "El id de la categoría es obligatorio y debe ser un número" });
      }

      //accedo al repositorio de categorías
      const repo = AppDataSource.getRepository("Categorias");
      const categoriaExistente = await repo.findOneBy({ id: Number(id), estado: true });
      if (!categoriaExistente) {
        return res.status(404).json({ message: `La categoría con id ${id} no existe` });
      }

      // realizo una eliminación lógica
      categoriaExistente.estado = false;

      // guardo los cambios
      await repo.save(categoriaExistente);

      // devuelvo una respuesta de éxito
      return res.status(200).json({ message: `Categoría con id ${id} eliminada correctamente` });
    } catch (error) {
      return res.status(500).json({ message: "Error al eliminar la categoría" });
    }
  };
}
export default CategoriasController;
