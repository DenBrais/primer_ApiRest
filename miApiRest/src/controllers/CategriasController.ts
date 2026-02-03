import { Request, Response } from "express";

class CategoriasController {
  // Métodos del controlador de categorías

  //metodo Create
  static createCategories = async (req: Request, res: Response) => {
    // Lógica para crear una nueva categoría
    res.status(201).json({ message: "Categoría creada exitosamente" });
  };
  //metodo read all
  static getAllCategories = async (req: Request, res: Response) => {
    // Lógica para obtener todas las categorías
    res.status(200).json({ message: "Obtener todas las categorías" });
  };

  //metodo read one
  static getCategoryById = async (req: Request, res: Response) => {
    const { id } = req.params;
    // Lógica para obtener una categoría por su ID
    res.status(200).json({ message: `Obtener categoría con ID: ${id}` });
  };
  //metodo update
  static updateCategories = async (req: Request, res: Response) => {
    const { id } = req.params;
    // Lógica para actualizar una categoría por su ID
    res.status(200).json({ message: `Actualizar categoría con ID: ${id}` });
  };

  //metodo delete
  static deleteCategories = async (req: Request, res: Response) => {
    const { id } = req.params;
    // Lógica para eliminar una categoría por su ID
    res.status(200).json({ message: `Eliminar categoría con ID: ${id}` });
  };
}
export default CategoriasController;
