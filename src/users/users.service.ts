import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';
import { AuthDTO } from 'src/auth/dto/auth.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async _create(authDTO: AuthDTO.SignUp): Promise<UserEntity> {
    try {
      const userEntity = this.userRepository.create({
        email: authDTO.email,
        password: authDTO.password,
        nickname: authDTO.nickname,
      });
      const savedUser = await this.userRepository.save(userEntity);
      console.log('User Saved', savedUser);
      return savedUser;
    } catch (error) {
      console.error('User Failed Error Message:' + error);
      throw error;
    }
  }

  async findById(id: number) {
    return await this.userRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email,
      },
    });
  }

  async findNickname(nickname: string) {
    return await this.userRepository.findOne({
      where: {
        nickname,
      },
    });
  }
}
