import { IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCategoriaDto {
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  descripcion?: string;
}

