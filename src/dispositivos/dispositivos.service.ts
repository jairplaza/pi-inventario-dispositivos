import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDispositivoDto } from './dto/create-dispositivo.dto';
import { UpdateDispositivoDto } from './dto/update-dispositivo.dto';
import { Dispositivo } from './entities/dispositivo.entity';

@Injectable()
export class DispositivosService {
  constructor(
    @InjectRepository(Dispositivo)
    private readonly dispositivoRepository: Repository<Dispositivo>,
  ) {}

  async create(createDispositivoDto: CreateDispositivoDto) {
    const dispositivo = this.dispositivoRepository.create(createDispositivoDto);
    return await this.dispositivoRepository.save(dispositivo);
  }

  async findAll() {
    return await this.dispositivoRepository.find();
  }

  async findOne(id: string) {
    const dispositivo = await this.dispositivoRepository.findOneBy({ id });
    if (!dispositivo) {
      throw new NotFoundException(`Dispositivo con ID ${id} no encontrado`);
    }
    return dispositivo;
  }

  async update(id: string, updateDispositivoDto: UpdateDispositivoDto) {
    const dispositivo = await this.findOne(id);
    this.dispositivoRepository.merge(dispositivo, updateDispositivoDto);
    return await this.dispositivoRepository.save(dispositivo);
  }

  async remove(id: string) {
    const dispositivo = await this.findOne(id);
    await this.dispositivoRepository.remove(dispositivo);
    return { message: `Dispositivo con ID ${id} eliminado exitosamente` };
  }
}