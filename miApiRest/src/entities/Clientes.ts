import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryColumn,
  OneToMany,
} from "typeorm";
import { Factura } from "./Factura";

@Entity({ name: "tbClientes" })
export class Clientes {
  @PrimaryColumn({ length: 9 })
  id: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  nombre: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  apellido1: string;

  @Column({ type: "varchar", length: 100, nullable: false })
  apellido2: string;

  @Column({ type: "varchar", length: 100, unique: true, nullable: false })
  email: string;

  @Column({ type: "varchar", length: 20, nullable: false })
  telefono: string;

  @Column({ type: "boolean", default: true })
  activo: boolean;

  @CreateDateColumn()
  fechaCreacion: Date;

  @UpdateDateColumn()
  fechaActualizacion: Date;

  @OneToMany(() => Factura, (factura) => factura.cliente)
  facturas: Factura[];
}
