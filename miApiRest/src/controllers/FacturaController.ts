import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Factura } from "../entities/Factura";
import { DetalleFactura } from "../entities/DetalleFactura";
import { Productos } from "../entities/Productos";
import { FacturaMapper } from "../mappers/FacturaMapper";

export class FacturaController {
  //metodo crear
  static createFactura = async (req: Request, res: Response) => {
    try {
      const { clienteId, detalles } = req.body;

      // Validaciones mínimas

      if (!clienteId || !Array.isArray(detalles) || detalles.length === 0) {
        return res.status(400).json({
          message: "Datos inválidos: clienteId y detalles son requeridos.",
        });
      }

      for (const d of detalles) {
        if (
          !d.productoId ||
          !Number.isInteger(d.cantidad) ||
          d.cantidad <= 0 ||
          Number(d.precioUnitario) <= 0
        ) {
          return res.status(400).json({
            message:
              "Detalle inválido (productoId, cantidad>0, precioUnitario>0).",
          });
        }
      }

      const result = await AppDataSource.transaction(async (manager) => {
        // 0) Validar stock disponible

        const productosRepo = manager.getRepository(Productos);

        for (const d of detalles) {
          const producto = await productosRepo.findOneBy({
            id: d.productoId,
          });

          if (!producto) {
            throw new Error(`El producto con id ${d.productoId} no existe.`);
          }

          const cantidadSolicitada = Number(d.cantidad);

          if (producto.stock < cantidadSolicitada) {
            throw new Error(
              `Stock insuficiente para el producto "${producto.nombre}". Disponible: ${producto.stock}, Solicitado: ${cantidadSolicitada}`,
            );
          }
        }

        // 1) Calcular totales

        const lineas: DetalleFactura[] = detalles.map((d: any) => {
          const linea = new DetalleFactura();

          linea.idProducto = d.productoId;

          linea.cantidad = d.cantidad;

          linea.precioUnitario = d.precioUnitario;

          const subTotal = Number(d.cantidad) * Number(d.precioUnitario);
          linea.subTotalDet = subTotal.toFixed(2);

          return linea;
        });

        const subtotalFact = Number(
          lineas.reduce((acc, l) => acc + Number(l.subTotalDet), 0).toFixed(2),
        );

        const impuesto = Number((subtotalFact * 0.13).toFixed(2)); // ejemplo IVA 13%

        const total = Number((subtotalFact + impuesto).toFixed(2));

        // 2) Crear Factura

        const factura = new Factura();

        factura.idCliente = clienteId;

        factura.fecha = new Date();

        factura.subTotalFact = subtotalFact.toFixed(2);

        factura.impuestoAPagar = impuesto.toFixed(2);

        factura.total = total.toFixed(2);

        factura.estado = true;

        // 3) Asignar detalles y guardar (cascade insert)

        factura.detalles = lineas;

        // Guardado con manager para mantener la transacción

        const savedFact = await manager.save(Factura, factura);

        // 4) Reducir stock de los productos

        for (const d of detalles) {
          const producto = await productosRepo.findOneBy({
            id: d.productoId,
          });
          if (producto) {
            producto.stock = producto.stock - Number(d.cantidad);
            await manager.save(Productos, producto);
          }
        }

        return savedFact;
      });

      return res.status(201).json({ ok: true, factura: result });
    } catch (error: any) {
      // ejemplo: numero unique duplicado

      return res.status(500).json({
        ok: false,

        message: "Error al guardar la factura.",

        detail: String(error?.message ?? error),
      });
    }
  };

  //metodo listar todas las facturas
  static getAllFacturas = async (_req: Request, res: Response) => {
    try {
      const repo = AppDataSource.getRepository(Factura);
      const facturas = await repo.find({ where: { estado: true } });

      if (facturas.length === 0) {
        return res.status(404).json({ message: "No hay facturas registradas" });
      }

      return res.status(200).json({
        ok: true,
        facturas: FacturaMapper.toResponseDtoList(facturas),
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Error al obtener las facturas.",
      });
    }
  };

  //metodo obtener factura por id
  static getFacturaById = async (_req: Request, res: Response) => {
    try {
      // busco el id que viene en los parámetros de la ruta
      const id = parseInt(
        Array.isArray(_req.params.id) ? _req.params.id[0] : _req.params.id,
      );

      const repo = AppDataSource.getRepository(Factura);
      const factura = await repo.findOneBy({ id: id, estado: true });

      if (!factura) {
        return res.status(404).json({
          ok: false,
          message: `La factura con id ${id} no existe.`,
        });
      }

      return res
        .status(200)
        .json({ ok: true, factura: FacturaMapper.toResponseDto(factura) });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Error al obtener la factura.",
      });
    }
  };

  //metdo actualizar factura
  static updateFactura = async (req: Request, res: Response) => {
    // por simplicidad, solo se permitirá actualizar el estado de la factura (ejemplo: anulada)
    try {
      const id = parseInt(
        Array.isArray(req.params.id) ? req.params.id[0] : req.params.id,
      );
      if (isNaN(id)) {
        return res.status(400).json({
          ok: false,
          message: "El id debe ser un número válido.",
        });
      }

      // por ahora solo mando un mensaje que el modulo no esta listo
      return res.status(200).json({
        ok: true,
        message: "Funcionalidad de actualización no implementada aún.",
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Error al actualizar la factura.",
      });
    }
  };

  //metodo eliminar factura
  static deleteFactura = async (req: Request, res: Response) => {
    try {
      const id = parseInt(
        Array.isArray(req.params.id) ? req.params.id[0] : req.params.id,
      );

      const result = await AppDataSource.transaction(async (manager) => {
        //busco la factura por id
        const repo = manager.getRepository(Factura);
        const factura = await repo.findOne({
          where: { id: id, estado: true },
          relations: ["detalles"],
        });

        if (!factura) {
          throw new Error(`La factura con id ${id} no existe.`);
        }

        // Devolver stock a los productos
        const productosRepo = manager.getRepository(Productos);

        for (const detalle of factura.detalles) {
          const producto = await productosRepo.findOneBy({
            id: detalle.idProducto,
          });

          if (producto) {
            producto.stock = producto.stock + Number(detalle.cantidad);
            await manager.save(Productos, producto);
          }
        }

        //elimino la factura (soft delete)
        factura.estado = false;

        //guardo el cambio
        await repo.save(factura);

        return factura;
      });

      //retorno respuesta exitosa
      return res.status(200).json({
        ok: true,
        message: `Factura con id ${id} eliminada exitosamente. Stock devuelto a los productos.`,
      });
    } catch (error: any) {
      return res.status(500).json({
        ok: false,
        message: "Error al eliminar la factura.",
        detail: String(error?.message ?? error),
      });
    }
  };
}
