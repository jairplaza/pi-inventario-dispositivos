import { PartialType } from '@nestjs/mapped-types';
import { CreateDispositivoDto } from './create-dispositivo.dto';
import { IsOptional, IsUUID } from 'class-validator';

export class UpdateDispositivoDto extends PartialType(CreateDispositivoDto) {
  @IsUUID()
  @IsOptional()
  categoriaId?: string;
}
