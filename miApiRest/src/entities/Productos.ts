import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  ForeignKey,
} from "typeorm";
import { DetalleFactura } from "./DetalleFactura";
import { Categorias } from "./Categorias";

@Entity({ name: "tbProductos" })
export class Productos {
  @PrimaryGeneratedColumn()
  id: number;

  @ForeignKey(() => Categorias)
  @Column({ type: "int", nullable: false })
  idCategoria: number;

  @Column({ type: "varchar", length: 150, nullable: false })
  nombre: string;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
    default: "0",
  })
  precio: string;

  @Column({ type: "int", nullable: false, default: 0 })
  stock: number;

  @Column({ type: "boolean", default: true })
  estado: boolean;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;

  @OneToMany(() => DetalleFactura, (detalle) => detalle.producto)
  detalles: DetalleFactura[];

  @ManyToOne(() => Categorias, (categoria) => categoria.productos)
  categoria: Categorias;
}
