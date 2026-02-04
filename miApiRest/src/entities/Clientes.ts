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

  @Column({ type: "varchar", length: 100 , nullable: false})
  nombre: string;

  @Column({ type: "varchar", length: 100 , nullable: false})
  apellido1: string;

  @Column({ type: "varchar", length: 100 , nullable: false})
  apellido2: string;

  @Column({ type: "varchar", length: 100, unique: true , nullable: false})
  email: string;

  @Column({ type: "varchar", length: 20, nullable: false })
  telefono: string;

  @Column({ type: "boolean", default: true })
  activo: boolean;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;
}
