import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Dispositivo } from '../../dispositivos/entities/dispositivo.entity';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @OneToMany(() => Dispositivo, (dispositivo) => dispositivo.categoria)
  dispositivos: Dispositivo[];
}

