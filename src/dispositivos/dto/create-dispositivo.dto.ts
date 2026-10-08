import { IsBoolean, IsNotEmpty, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';

export class CreateDispositivoDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  nombre: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  tipo: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  serial: string;

  @IsBoolean()
  @IsOptional()
  disponible?: boolean;

  @IsUUID()
  @IsNotEmpty()
  categoriaId: string;
}

