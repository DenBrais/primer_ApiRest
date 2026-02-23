import { IsString, IsNotEmpty, MaxLength } from "class-validator";

// DTO para validar el parámetro ID del cliente en las rutas
export class IdClienteParamDto {
  @IsString({ message: "El nombre debe ser una cadena de texto" })
  @IsNotEmpty({ message: "El id es obligatorio" })
  @MaxLength(9, { message: "El id no puede exceder los 9 caracteres" })
  id!: string;
}
