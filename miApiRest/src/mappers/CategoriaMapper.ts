import { CategoriaResponseDto } from "../dtos/CategoriaDto";
import { Categorias } from "../entities/Categorias";

export class CategoriaMapper {
  //metodo mapeo de entidad a dto
  static toResponseDto(entity: Categorias): CategoriaResponseDto {
    return {
      id: entity.id,
      nombre: entity.nombre,
      descripcion: entity.descripcion || undefined,
    };
  }

  //metodo mapeo de lista de entidades a lista de dtos
  static toResponseDtoList(entities: Categorias[]): CategoriaResponseDto[] {
    return entities.map(this.toResponseDto);
  }
}
