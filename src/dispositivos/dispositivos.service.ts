import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Dispositivo } from './entities/dispositivo.entity';
import { CreateDispositivoDto } from './dto/create-dispositivo.dto';
import { UpdateDispositivoDto } from './dto/update-dispositivo.dto';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { Categoria } from '../categorias/entities/categoria.entity';

@Injectable()
export class DispositivosService {
  constructor(
    @InjectRepository(Dispositivo)
    private readonly dispositivoRepository: Repository<Dispositivo>,
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async create(createDispositivoDto: CreateDispositivoDto) {
    const { categoriaId, ...dispositivoData } = createDispositivoDto;

    const categoria = await this.categoriaRepository.findOne({
      where: { id: categoriaId },
    });

    if (!categoria) {
      throw new NotFoundException(`Categoría con ID ${categoriaId} no encontrada`);
    }

    const dispositivo = this.dispositivoRepository.create({
      ...dispositivoData,
      categoria,
    });

    return await this.dispositivoRepository.save(dispositivo);
  }

  async findAll(paginationQueryDto: PaginationQueryDto) {
    const { page = 1, limit = 10, search, order = 'ASC' } = paginationQueryDto;
    const skip = (page - 1) * limit;

    // Construimos las condiciones de búsqueda si viene el parámetro 'search'
    const where = search
      ? [
          { nombre: ILike(`%${search}%`) },
          { tipo: ILike(`%${search}%`) },
        ]
      : undefined;

    const [data, total] = await this.dispositivoRepository.findAndCount({
      where,
      relations: { categoria: true },
      take: limit,
      skip: skip,
      order: {
        nombre: order,
      },
    });

    return {
      data,
      meta: {
        total,
        page,
        lastPage: Math.ceil(total / limit),
        limit,
      },
    };
  }

  async findOne(id: string) {
    const dispositivo = await this.dispositivoRepository.findOne({
      where: { id },
      relations: { categoria: true },
    });
    if (!dispositivo) {
      throw new NotFoundException(`Dispositivo con ID ${id} no encontrado`);
    }
    return dispositivo;
  }

  async update(id: string, updateDispositivoDto: UpdateDispositivoDto) {
    const { categoriaId, ...dispositivoData } = updateDispositivoDto;
    const dispositivo = await this.findOne(id);

    if (categoriaId) {
      const categoria = await this.categoriaRepository.findOne({
        where: { id: categoriaId },
      });
      if (!categoria) {
        throw new NotFoundException(`Categoría con ID ${categoriaId} no encontrada`);
      }
      dispositivo.categoria = categoria;
    }

    this.dispositivoRepository.merge(dispositivo, dispositivoData);
    return await this.dispositivoRepository.save(dispositivo);
  }

  async remove(id: string) {
    const dispositivo = await this.findOne(id);
    await this.dispositivoRepository.remove(dispositivo);
    return { message: `Dispositivo con ID ${id} eliminado exitosamente` };
  }
}
