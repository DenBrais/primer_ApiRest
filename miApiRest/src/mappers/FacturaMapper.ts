import { Factura } from "../entities/Factura";
import { DetalleFacturaResponseDto, FacturaResponseDto } from "../dtos/FacturaDto";

export class FacturaMapper {
  //metodo mapeo de entidad a dto
  static toResponseDto(entity: Factura): FacturaResponseDto {
    const detalles: DetalleFacturaResponseDto[] = (entity.detalles ?? []).map(
      (detalle) => ({
        idFactura: detalle.idFactura,
        idProducto: detalle.idProducto,
        cantidad: detalle.cantidad,
        precioUnitario: detalle.precioUnitario,
        subTotalDet: detalle.subTotalDet,
      }),
    );

    return {
      id: entity.id,
      idCliente: entity.idCliente,
      fecha: entity.fecha,
      subTotalFact: entity.subTotalFact,
      impuestoAPagar: entity.impuestoAPagar,
      total: entity.total,
      detalles: detalles,
    };
  }

  //metodo mapeo de lista de entidades a lista de dtos
  static toResponseDtoList(entities: Factura[]): FacturaResponseDto[] {
    return entities.map(this.toResponseDto);
  }
}
