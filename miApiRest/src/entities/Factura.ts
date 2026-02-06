import { Column, Entity } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";

@Entity({ name: "tbFacturas" })
export class Factura {
  // Completa la definición de la entidad Factura según tus necesidades
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date", nullable: false })
  fecha: Date;
  @Column()
  idCliente: string;
  @Column()
  estado: boolean;
}
