import {
  IsNotEmpty,
  IsNumberString,
  Max,
  IsArray,
  ValidateNested,
  IsInt,
  Min,
  ArrayMinSize,
} from "class-validator";
import { Type } from "class-transformer";

//Dtos para respuonse
export class DetalleFacturaResponseDto {
  idFactura!: number;
  idProducto!: number;
  cantidad!: string;
  precioUnitario!: string;
  subTotalDet!: string;
}

export class FacturaResponseDto {
  id!: number;
  idCliente!: string;
  fecha!: Date;
  subTotalFact!: string;
  impuestoAPagar!: string;
  total!: string;
  detalles!: DetalleFacturaResponseDto[];
}

//Dto para los detalles de factura en la creación
export class DetalleFacturaCreateDto {
  @IsNotEmpty({ message: "El id del producto es obligatorio" })
  @IsInt({ message: "El id del producto debe ser un número entero" })
  productoId!: number;

  @IsNotEmpty({ message: "La cantidad es obligatoria" })
  @IsNumberString({}, { message: "La cantidad debe ser un número válido" })
  @Min(1, { message: "La cantidad debe ser mayor a 0" })
  cantidad!: string;

  @IsNotEmpty({ message: "El precio unitario es obligatorio" })
  @IsNumberString(
    {},
    { message: "El precio unitario debe ser un número válido" },
  )
  @Min(0.01, { message: "El precio unitario debe ser mayor a 0" })
  precioUnitario!: string;
}

//Dto para creacion de factura
export class FacturaCreateDto {
  @IsNotEmpty({ message: "El id del cliente es obligatorio" })
  clienteId!: string;

  @IsArray({ message: "Los detalles deben ser un array" })
  @ArrayMinSize(1, { message: "Debe incluir al menos un detalle" })
  @ValidateNested({ each: true })
  @Type(() => DetalleFacturaCreateDto)
  detalles!: DetalleFacturaCreateDto[];
}

export class FacturaUpdateDto {
  @IsNotEmpty({ message: "El id del cliente es obligatorio" })
  @Max(9, { message: "El id del cliente no puede exceder los 9 caracteres" })
  idCliente!: string;

  @IsNotEmpty({ message: "La fecha es obligatoria" })
  fecha!: Date;
}
