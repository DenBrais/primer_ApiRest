import { IsNotEmpty, IsNumber, Max } from "class-validator";

//Dtos para respuonse
export class FacturaResponseDto {
  id!: number;
  idCliente!: string;
  fecha!: Date;
  subTotalFact!: number;
  impuestoAPagar!: number;
  total!: number;
}

//Dto para creacion
export class FacturaCreateDto {
  @IsNotEmpty({ message: "El id del cliente es obligatorio" })
  @Max(9, { message: "El id del cliente no puede exceder los 9 caracteres" })
  idCliente!: string;

  @IsNotEmpty({ message: "La fecha es obligatoria" })
  fecha!: Date;

  @IsNotEmpty({ message: "El subtotal es obligatorio" })
  @IsNumber({}, { message: "El impuesto a pagar debe ser un número" })
  impuestoAPagar!: number;
}

export class FacturaUpdateDto {
  @IsNotEmpty({ message: "El id del cliente es obligatorio" })
  @Max(9, { message: "El id del cliente no puede exceder los 9 caracteres" })
  idCliente!: string;

  @IsNotEmpty({ message: "La fecha es obligatoria" })
  fecha!: Date;

  @IsNotEmpty({ message: "El subtotal es obligatorio" })
  @IsNumber({}, { message: "El impuesto a pagar debe ser un número" })
  impuestoAPagar!: number;
}
