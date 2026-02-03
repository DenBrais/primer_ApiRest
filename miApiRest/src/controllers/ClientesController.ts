import { Request, Response } from "express";

export class ClientesController {
  // Controller methods would go here
  static getAllClients = async (req: Request, res: Response) => {
    // Lógica para obtener todas los clientes
    res.status(200).json({ message: "Obtener todas los clientes" });
  };
}
