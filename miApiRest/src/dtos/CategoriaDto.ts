import { IsNotEmpty, IsString, MaxLength } from "class-validator";

// DTO para la respuesta de categoría
export class CategoriaResponseDto {
  id!: number;
  nombre!: string;
  descripcion?: string;
}

// DTO para la creación de categoría
export class CategoriaCreateDto {
  @IsString({ message: "El nombre debe ser una cadena de texto" })
  @IsNotEmpty({ message: "El nombre de la categoría es obligatorio" })
  @MaxLength(100, { message: "El nombre no puede exceder los 100 caracteres" })
  nombre!: string;

  @IsString({ message: "La descripción debe ser una cadena de texto" })
  @MaxLength(255, {
    message: "La descripción no puede exceder los 255 caracteres",
  })
  descripcion?: string;
}

// DTO para la actualización de categoría
export class CategoriaUpdateDto {
  @IsString({ message: "El nombre debe ser una cadena de texto" })
  @IsNotEmpty({ message: "El nombre de la categoría es obligatorio" })
  @MaxLength(100, { message: "El nombre no puede exceder los 100 caracteres" })
  nombre!: string;

  @IsString({ message: "La descripción debe ser una cadena de texto" })
  @MaxLength(255, {
    message: "La descripción no puede exceder los 255 caracteres",
  })
  descripcion?: string;
}
