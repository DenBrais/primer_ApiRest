import { IsString, IsNotEmpty, MaxLength, IsEmail } from "class-validator";

//Dto para el response
export class ClienteResposeDto {
  nombre!: string;
  apellido1!: string;
  apellido2!: string;
  email!: string;
  telefono!: string;
}

//Dto para la creacion
export class ClienteCreateDto {
  @IsString({ message: "El nombre debe ser una cadena de texto" })
  @IsNotEmpty({ message: "El nombre de la categoría es obligatorio" })
  @MaxLength(100, { message: "El nombre no puede exceder los 100 caracteres" })
  nombre!: string;

  @IsString({ message: "El nombre debe ser una cadena de texto" })
  @IsNotEmpty({ message: "El nombre de la categoría es obligatorio" })
  @MaxLength(100, { message: "El nombre no puede exceder los 100 caracteres" })
  apellido1!: string;

  @IsString({ message: "El nombre debe ser una cadena de texto" })
  @IsNotEmpty({ message: "El nombre de la categoría es obligatorio" })
  @MaxLength(100, { message: "El nombre no puede exceder los 100 caracteres" })
  apellido2!: string;

  @IsEmail(
    {},
    { message: "El email debe ser una dirección de correo electrónico válida" },
  )
  @IsNotEmpty({ message: "El email es obligatorio" })
  @MaxLength(100, { message: "El email no puede exceder los 100 caracteres" })
  email!: string;

  @IsNotEmpty({ message: "El teléfono es obligatorio" })
  @MaxLength(20, { message: "El teléfono no puede exceder los 20 caracteres" })
  telefono!: string;
}

//Dto para la actualizacion del cliente
export class ClienteUpdateDto {
  @IsString({ message: "El nombre debe ser una cadena de texto" })
  @IsNotEmpty({ message: "El nombre de la categoría es obligatorio" })
  @MaxLength(100, { message: "El nombre no puede exceder los 100 caracteres" })
  nombre!: string;

  @IsString({ message: "El nombre debe ser una cadena de texto" })
  @IsNotEmpty({ message: "El nombre de la categoría es obligatorio" })
  @MaxLength(100, { message: "El nombre no puede exceder los 100 caracteres" })
  apellido1!: string;

  @IsString({ message: "El nombre debe ser una cadena de texto" })
  @IsNotEmpty({ message: "El nombre de la categoría es obligatorio" })
  @MaxLength(100, { message: "El nombre no puede exceder los 100 caracteres" })
  apellido2!: string;

  @IsEmail(
    {},
    { message: "El email debe ser una dirección de correo electrónico válida" },
  )
  @IsNotEmpty({ message: "El email es obligatorio" })
  @MaxLength(100, { message: "El email no puede exceder los 100 caracteres" })
  email!: string;

  @IsNotEmpty({ message: "El teléfono es obligatorio" })
  @MaxLength(20, { message: "El teléfono no puede exceder los 20 caracteres" })
  telefono!: string;
}
