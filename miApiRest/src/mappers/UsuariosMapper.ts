import { Usuarios } from "../entities/Usuarios";
import { UsuarioResponseDto } from "../dtos/UsuarioDto";

//metodo para mapear la entidad a un dto de respuesta
export class UsuariosMapper {
  static toResponseDto(entity: Usuarios): UsuarioResponseDto {
    return {
      id: entity.id,
    };
  }

  //metodo para mapear una lista de entidades a una lista de dtos de respuesta
  static toResponseDtoList(entities: Usuarios[]): UsuarioResponseDto[] {
    return entities.map(this.toResponseDto);
  }
}
