import { Request, Response } from "express";
import { AppDataSource } from "../data-source";

export class ClientesController {
  
 //metodo create
  static createCliente = async (req: Request, res: Response) => {
    // Lógica para crear un cliente
    try {
      //destructuro los datos del body y los parametros
      const { nombre, apellido1, apellido2, email, telefono } = req.body;
      const { id } = req.params;

      //validaciones de entrada
      //valido id obligatiorio y numérico
      if (!id || isNaN(Number(id))) {
        return res
          .status(400)
          .json({ message: "El id del cliente es obligatorio y debe ser un número" });
      }
      //valido nombre obligatorio
      if (!nombre || nombre.length === 0) {
        return res
          .status(400)
          .json({ message: "El nombre del cliente es obligatorio" });
      }

      //valido apellido1 y apellido2 obligatorios
      if (!apellido1 || apellido1.length === 0) {
        return res
          .status(400)
          .json({ message: "El primer apellido del cliente es obligatorio" });
      }
      if (!apellido2 || apellido2.length === 0) {
        return res
          .status(400)
          .json({ message: "El segundo apellido del cliente es obligatorio" });
      }

      //valido email obligatorio y formato básico
      if (!email || email.length === 0) {
        return res
          .status(400)
          .json({ message: "El email del cliente es obligatorio" });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "El formato del email es inválido" });
      }

      //reglas de negocio
      //accedo al repositorio de clientes
      const repo = AppDataSource.getRepository("Clientes");
      const clienteExistente = await repo.findOneBy({ id: Number(id) });
      
      //valido si el id ya existe
      if (clienteExistente) {
        return res.status(400).json({ message: "El id del cliente ya existe" });
      }

      //si no existe, creo el nuevo cliente
      const nuevoCliente = repo.create({
        id: Number(id),
        nombre: nombre,
        apellido1: apellido1,
        apellido2: apellido2,
        email: email,
        telefono: telefono,
      });

      //guardo el nuevo cliente en la BD
      await repo.save(nuevoCliente);

      //devuelvo el nuevo cliente creado
      return res.status(201).json(nuevoCliente);

    } catch (error) {
      return res.status(500).json({ message: "Error al crear el cliente" });
    }
  };

  //metodo read all
  static getAllClientes = async (req: Request, res: Response) => {
    // Lógica para obtener todas las categorías
    try {
      const repo=AppDataSource.getRepository("Clientes");
      const ListaClientes=await repo.find({where:{estado:true}});
      
      if(ListaClientes.length===0){
        return res.status(404).json({message:"No hay clientes registrados"});
      }

      return res.status(200).json(ListaClientes);

      
    } catch (error) {
      return res.status(500).json({ message: "Error al obtener los clientes" });
    }
  };

  //metodo read one
  static getClienteById = async (req: Request, res: Response) => {
    
    try {

      //destructuración del id en este caso en los parámetros
      const {id} = req.params;

      //validar si el id viene vacío o no es un número
      if(!id || isNaN(Number(id))){
        return res.status(400).json({message:"El id del cliente es obligatorio y debe ser un número"});
      }

      // accedo al repositorio de clientes
      const repo=AppDataSource.getRepository("Clientes");
      const cliente=await repo.findOneBy({id: Number(id), estado:true});

      if(!cliente){
        return res.status(404).json({message:`El cliente con id ${id} no existe`});
      }
      
      res.status(200).json(cliente);

    } catch (error) {
      return res.status(500).json({ message: "Error al obtener el cliente" });
    }
  };

  //metodo update
  static updateCliente = async (req: Request, res: Response) => {
    try {
      //destructuración del id en este caso en los parámetros
      const {id} = req.params;

      //destructuración del body
      const {nombre, apellido1, apellido2, email, telefono} = req.body;

      //validaciones de entrada
      if(!id || isNaN(Number(id))){
        return res.status(400).json({message:"El id del cliente es obligatorio y debe ser un número"});
      }

      if(!nombre || nombre.length===0){
        return res.status(400).json({message:"El nombre del cliente es obligatorio"});
      }
      if(!apellido1 || apellido1.length===0){
        return res.status(400).json({message:"El primer apellido del cliente es obligatorio"});
      }
      if(!apellido2 || apellido2.length===0){
        return res.status(400).json({message:"El segundo apellido del cliente es obligatorio"});
      }
      if(!email || email.length===0){
        return res.status(400).json({message:"El email del cliente es obligatorio"});
      }
      if(!telefono || telefono.length===0){
        return res.status(400).json({message:"El teléfono del cliente es obligatorio"});
      }

      //accedo al repositorio de clientes
      const repo=AppDataSource.getRepository("Clientes");
      const clienteExistente=await repo.findOneBy({id: Number(id), estado:true});

      //verifico si el cliente existe
      if(!clienteExistente){
        return res.status(404).json({message:`El cliente con id ${id} no existe`});
      }

      //verifico si existe otro cliente con el mismo email
      const emailExistente=await repo.findOneBy({email: email, id: (Number(id)), estado:true});
      if(emailExistente ){
        return res.status(400).json({message:`El email ${email} ya está en uso por otro cliente`});
      }

      //verifico otro cliente con mismo teléfono
      const telefonoExistente=await repo.findOneBy({telefono: telefono, id: (Number(id)), estado:true});
      if(telefonoExistente){
        return res.status(400).json({message:`El teléfono ${telefono} ya está en uso por otro cliente`});
      }

      //actualizo los datos
      clienteExistente.nombre=nombre;
      clienteExistente.apellido1=apellido1;
      clienteExistente.apellido2=apellido2;
      clienteExistente.email=email;
      clienteExistente.telefono=telefono;

      //guardo los cambios
      await repo.save(clienteExistente);

      //devuelvo el cliente actualizado
      return  res.status(200).json(clienteExistente);
      
    } catch (error) {
      return res.status(500).json({ message: "Error al actualizar el cliente" });
    }
  };

  //metodo delete
  static deleteClientes = async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      //validaciones de entrada
      if (!id || isNaN(Number(id))) {
        return res
          .status(400)
          .json({ message: "El id del cliente es obligatorio y debe ser un número" });
      }

      //accedo al repositorio de clientes
      const repo = AppDataSource.getRepository("Clientes");
      const clienteExistente = await repo.findOneBy({ id: Number(id), estado: true });
      
      //verifico si el cliente existe
      if (!clienteExistente) {
        return res.status(404).json({ message: `El cliente con id ${id} no existe` });
      }

      // realizo una eliminación lógica
      clienteExistente.estado = false;

      // guardo los cambios
      await repo.save(clienteExistente);

      // devuelvo una respuesta de éxito
      return res.status(200).json({ message: `Cliente con id ${id} eliminado correctamente` });
    } catch (error) {
      return res.status(500).json({ message: "Error al eliminar el cliente" });
    }
  };
}
