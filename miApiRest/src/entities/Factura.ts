import { Column, Entity, ForeignKey, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Clientes } from "./Clientes";
import { DetalleFactura } from "./DetalleFactura";

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
  @ManyToOne(() => Clientes, (cliente) => cliente.facturas)
  @JoinColumn({ name: "idCliente" })
  cliente: Clientes;

  @OneToMany(() => DetalleFactura, (detalle) => detalle.factura)
  detalles: DetalleFactura[];
}
