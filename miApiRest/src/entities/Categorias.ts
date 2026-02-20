import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Productos } from "./Productos";

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

  @OneToMany(() => Productos, (producto) => producto.categoria)
  productos: Productos[];
}
