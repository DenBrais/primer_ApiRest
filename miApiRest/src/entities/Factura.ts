import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Clientes } from "./Clientes";
import { DetalleFactura } from "./DetalleFactura";

@Entity({ name: "tbFacturas" })
export class Factura {
  // Completa la definición de la entidad Factura según tus necesidades
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 9, nullable: false })
  idCliente: string;

  @Column({ type: "date", nullable: false })
  fecha: Date;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
    default: 0,
  })
  subTotalFact: string;

  @Column({
    nullable: false,
    type: "decimal",
    precision: 10,
    scale: 2,
    default: "0.13",
  })
  impuestoAPagar: string;

  @Column({
    type: "decimal",
    precision: 10,
    scale: 2,
    nullable: false,
    default: "0",
  })
  total: string;

  @Column({ type: "boolean", nullable: false, default: true })
  estado: boolean;
  @ManyToOne(() => Clientes, (cliente) => cliente.facturas)
  @JoinColumn({ name: "idCliente" })
  cliente: Clientes;

  @OneToMany(
    () => DetalleFactura,
    (detalle) => detalle.factura,
    {
      cascade: ["insert", "update"], // clave: guarda detalles al guardar factura
      eager: true,
    }, // carga automática de detalles con la factura
  )
  detalles: DetalleFactura[];
}
