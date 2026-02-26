//Dto de response

import {
  IsNotEmpty,
  IsPositive,
  IsString,
  MaxLength,
  IsNumberString,
  IsInt,
  IsNumber,
  IsDecimal,
} from "class-validator";

export class ProductoResponseDto {
  id: number;
  idCategoria: number;
  nombre: string;
  precio: string;
  stock: number;
}
//Dto de Create
export class ProductoCreateDto {
  @IsNotEmpty({ message: "El id de categoría es obligatorio" })
  @IsInt({ message: "El id de categoría debe ser un número entero" })
  idCategoria: number;

  @IsNotEmpty({ message: "El nombre es obligatorio" })
  @IsString({ message: "El nombre debe ser una cadena de texto" })
  @MaxLength(150, { message: "El nombre no puede exceder los 150 caracteres" })
  nombre: string;

  @IsNotEmpty({ message: "El precio es obligatorio" })
  @IsNumberString({}, { message: "El precio debe ser un número válido" })
  @IsPositive({ message: "El precio debe ser un número positivo" })
  precio: string;

  @IsNotEmpty({ message: "El precio es obligatorio" })
  @IsNumber({}, { message: "El precio debe ser un número" })
  @IsPositive({ message: "El precio debe ser un número positivo" })
  stock: number;
}

//Dto de Update
export class ProductoUpdateDto {
  @IsNotEmpty({ message: "El id de categoría es obligatorio" })
  idCategoria: number;

  @IsNotEmpty({ message: "El nombre es obligatorio" })
  @IsString({ message: "El nombre debe ser una cadena de texto" })
  @MaxLength(150, { message: "El nombre no puede exceder los 150 caracteres" })
  nombre: string;

  @IsNotEmpty({ message: "El precio es obligatorio" })
  @IsNumber({}, { message: "El precio debe ser un número" })
  @IsPositive({ message: "El precio debe ser un número positivo" })
  @IsDecimal(
    { decimal_digits: "0,2" },
    {
      message:
        "El precio debe ser un número decimal con hasta 2 dígitos decimales",
    },
  )
  precio: number;

  @IsNotEmpty({ message: "El precio es obligatorio" })
  @IsNumber({}, { message: "El precio debe ser un número" })
  @IsPositive({ message: "El precio debe ser un número positivo" })
  stock: number;
}
