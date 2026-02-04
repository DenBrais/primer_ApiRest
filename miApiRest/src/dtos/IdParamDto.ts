import { Type } from "class-transformer";
import { IsInt, Min } from "class-validator";

// DTO para validar el parámetro ID en las rutas

export class IdParamDto {
  @Type(() => Number)
  @IsInt({ message: "El ID debe ser un número entero" })
  @Min(1, { message: "El ID debe ser un número positivo" })
  id!: number;
}
