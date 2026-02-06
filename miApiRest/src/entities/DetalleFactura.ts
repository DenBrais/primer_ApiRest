import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity({ name: "tbDetalleFactura" })
export class DetalleFactura {
  @PrimaryColumn()
  idFactura: number;
  @PrimaryColumn()
  idProducto: number;

  @Column({ type: "int", nullable: false })
  cantidad: number;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  total: number;
}
