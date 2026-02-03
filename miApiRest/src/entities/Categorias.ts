import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "tbCategorias" })
export class Categorias {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, nullable: false })
  nombre: string;

  @Column({ length: 255, nullable: true })
  descripcion: string;

  @Column({ default: true })
  estado: boolean;
}
