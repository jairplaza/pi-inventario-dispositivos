import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Categoria } from '../../categorias/entities/categoria.entity';

@Entity('dispositivos')
export class Dispositivo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  nombre: string;

  @Column({ type: 'varchar', length: 50 })
  tipo: string; // Ej: Laptop, Monitor, Mouse, etc.

  @Column({ type: 'varchar', length: 100, unique: true })
  serial: string;

  @Column({ type: 'boolean', default: true })
  disponible: boolean;

  @ManyToOne(() => Categoria, (categoria: Categoria) => categoria.dispositivos, { eager: true, onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'categoria_id' })
  categoria: Categoria;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
