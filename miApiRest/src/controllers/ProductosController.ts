import { Request, Response } from "express";

export class ProductosController {
  // Controller methods would go here
  static getAllProducts = async (req: Request, res: Response) => {
    // Lógica para obtener todas los productos
    res.status(200).json({ message: "Obtener todas los productos" });
  };
}
