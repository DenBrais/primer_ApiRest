import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { Factura } from "./Factura";
import { Productos } from "./Productos";
import { join } from "node:path";

@Entity({ name: "tbDetalleFactura" })
export class DetalleFactura {
      @PrimaryColumn()
      idFactura: number;
      @PrimaryColumn()
      idProducto: number;

  @Column({ type: "int", nullable: false })
  cantidad: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  subTotal: number;

  @ManyToOne(() => Factura, (factura) => factura.detalles)
  @JoinColumn({ name: "idFactura" })
  factura: Factura;

  @ManyToOne(() => Productos, (producto) => producto.detalles)
  @JoinColumn({ name: "idProducto" })
  producto: Productos;
}
