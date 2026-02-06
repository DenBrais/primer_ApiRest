import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "tbProductos" })
export class Productos {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 150, nullable: false })
  nombre: string;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0,
  })
  precio: number;

  @Column({ type: "int", nullable: false, default: 0 })
  stock: number;

  @Column({ type: "boolean", default: true })
  estado: boolean;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;
}
