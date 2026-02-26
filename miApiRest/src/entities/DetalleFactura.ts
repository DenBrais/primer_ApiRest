import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { Factura } from "./Factura";
import { Productos } from "./Productos";

@Entity({ name: "tbDetalleFactura" })
export class DetalleFactura {
  @PrimaryColumn()
  idFactura: number;
  @PrimaryColumn()
  idProducto: number;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  cantidad: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  precioUnitario: string;

  @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
  subTotalDet: string;

  @ManyToOne(() => Factura, (factura) => factura.detalles)
  @JoinColumn({ name: "idFactura" })
  factura: Factura;

  @ManyToOne(() => Productos, (producto) => producto.detalles)
  @JoinColumn({ name: "idProducto" })
  producto: Productos;
}
