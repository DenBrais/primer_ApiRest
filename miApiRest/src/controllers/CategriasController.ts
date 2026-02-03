import { Request, Response } from "express";

class CategoriasController {
  // Métodos del controlador de categorías
  static getAllCategories = async (req: Request, res: Response) => {
    // Lógica para obtener todas las categorías
    res.status(200).json({ message: "Obtener todas las categorías" });
  };
}
export default CategoriasController;
