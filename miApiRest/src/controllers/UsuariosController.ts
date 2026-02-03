import { Request, Response } from "express";

class UsuariosController {
  // Controller methods would go here
  static getAllUsers = async (req: Request, res: Response) => {
    // Lógica para obtener todas los usuarios
    res.status(200).json({ message: "Obtener todas los usuarios" });
  };
}
export default UsuariosController;
