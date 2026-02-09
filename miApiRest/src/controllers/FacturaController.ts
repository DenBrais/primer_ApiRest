import { Request, Response } from "express";
import { AppDataSource } from "../data-source";
import { Factura } from "../entities/Factura";
import { DetalleFactura } from "../entities/DetalleFactura";

export class FacturaController {
  //metodo crear
  static createFactura = async (req: Request, res: Response) => {
    const { numero, clienteId, detalles } = req.body;

    // Validaciones mínimas

    if (
      !numero ||
      !clienteId ||
      !Array.isArray(detalles) ||
      detalles.length === 0
    ) {
      return res.status(400).json({
        message:
          "Datos inválidos: numero, clienteId y detalles son requeridos.",
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

    try {
      const result = await AppDataSource.transaction(async (manager) => {
        // 1) Calcular totales

        const lineas: DetalleFactura[] = detalles.map((d: any) => {
          const linea = new DetalleFactura();

          linea.idProducto = d.productoId;

          linea.cantidad = d.cantidad;

          linea.precioUnitario = Number(d.precioUnitario);

          linea.subTotal = Number(
            (linea.cantidad * linea.precioUnitario).toFixed(2),
          );

          return linea;
        });

        const subtotal = Number(
          lineas.reduce((acc, l) => acc + Number(l.subTotal), 0).toFixed(2),
        );

        const impuesto = Number((subtotal * 0.13).toFixed(2)); // ejemplo IVA 13%

        const total = Number((subtotal + impuesto).toFixed(2));

        // 2) Crear Factura

        const factura = new Factura();

        factura.numero = numero;

        factura.clienteId = clienteId;

        factura.subtotal = subtotal;

        factura.impuesto = impuesto;

        factura.total = total;

        // 3) Asignar detalles y guardar (cascade insert)

        factura.detalles = lineas;

        // Guardado con manager para mantener la transacción

        const saved = await manager.save(Factura, factura);

        return saved;
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
  static getAllFacturas = async (req: Request, res: Response) => {
    try {
      const facturas = await AppDataSource.getRepository(Factura).find({
        relations: ["detalles"],
      });
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Error al obtener las facturas.",
      });
    }
  };

  //metodo obtener factura por id
  static getFacturaById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(
        Array.isArray(req.params.id) ? req.params.id[0] : req.params.id,
      );
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Error al obtener la factura.",
      });
    }
  };

  //metdo actualizar factura
  static updateFactura = async (req: Request, res: Response) => {
    try {
      const id = parseInt(
        Array.isArray(req.params.id) ? req.params.id[0] : req.params.id,
      );
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
    } catch (error) {
      return res.status(500).json({
        ok: false,
        message: "Error al eliminar la factura.",
      });
    }
  };
}
