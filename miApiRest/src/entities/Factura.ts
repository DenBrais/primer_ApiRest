import { Column, Entity, ForeignKey } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";

@Entity({ name: "tbFacturas" })
export class Factura {
  // Completa la definición de la entidad Factura según tus necesidades
  @PrimaryGeneratedColumn()
  id: number;

  @ForeignKey(() => Clientes)
  @Column({ type: "varchar", length: 9, nullable: false })
  idCliente: string;
  
  @Column({ type: "date", nullable: false })
  fecha: Date;

  
  @Column()
  estado: boolean;
}
