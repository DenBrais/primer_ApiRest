import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "tbUsuarios" })
export class Usuarios {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50, nullable: false })
  nombre: string;

  @Column({ length: 50, nullable: false })
  apellido1: string;

  @Column({ length: 50, nullable: true })
  apellido2: string;

  @Column({ length: 100, unique: true, nullable: false })
  email: string;

  @Column({ default: true })
  estado: boolean;
}
