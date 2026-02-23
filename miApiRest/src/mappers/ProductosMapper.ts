import { Productos } from "../entities/Productos";
import { ProductoResponseDto } from "../dtos/ProductoDto";

export class ProductosMapper {
  //metodo mapeo de entidad a dto
  static toResponseDto(entity: Productos): ProductoResponseDto {
    return {
      id: entity.id,
      idCategoria: entity.idCategoria,
      nombre: entity.nombre,
      precio: entity.precio,
      stock: entity.stock,
    };
  }
  //metodo mapeo de lista de entidades a lista de dtos
  static toResponseDtoList(entities: Productos[]): ProductoResponseDto[] {
    return entities.map(this.toResponseDto);
  }
}
