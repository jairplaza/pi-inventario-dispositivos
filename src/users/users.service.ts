import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(
    createUserDto: CreateUserDto,
  ): Promise<{ id: string; username: string }> {
    try {
      const user = this.userRepository.create(createUserDto);
      const saved = await this.userRepository.save(user);
      return { id: saved.id, username: saved.username };
    } catch (error: any) {
      if (error.code === '23505') {
        throw new ConflictException('El nombre de usuario ya existe');
      }
      throw error;
    }
  }

  async findOneByUsername(username: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { username } });
  }
}

