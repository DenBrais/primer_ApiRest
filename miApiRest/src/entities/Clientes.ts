import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
} from "typeorm";

@Entity({ name: "tbClientes" })
export class Clientes {
  @PrimaryColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  nombre: string;

  @Column({ type: "varchar", length: 100, unique: true })
  correo: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  telefono: string;

  @Column({ type: "boolean", default: true })
  activo: boolean;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;
}
