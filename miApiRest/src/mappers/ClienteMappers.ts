import { Clientes } from "../entities/Clientes";
import { ClienteResponseDto } from "../dtos/ClienteDto";

export class ClienteMapper {
  //metodo mapeo de entidad a dto
  static toResponseDto(entity: Clientes): ClienteResponseDto {
    return {
      id: entity.id,
      nombre: entity.nombre,
      apellido1: entity.apellido1,
      apellido2: entity.apellido2,
      email: entity.email,
      telefono: entity.telefono,
    };
  }

  //metodo mapeo de lista de entidades a lista de dtos
  static toResponseDtoList(entities: Clientes[]): ClienteResponseDto[] {
    return entities.map(this.toResponseDto);
  }
}
