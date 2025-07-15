/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Body, ConflictException, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthDTO } from 'src/auth/dto/auth.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UsersService) {}

  @Post('/signup')
  async singup(@Body() authDTO: AuthDTO.SignUp): Promise<string> {
    const { email, nickname } = authDTO;

    const hasEmail = await this.userService.findByEmail(email);
    const hasNickname = await this.userService.findNickname(nickname);
    if (hasEmail) {
      throw new ConflictException('이미 사용중인 이메일입니다.');
    }
    if (hasNickname) {
      throw new ConflictException('이미 사용중인 닉네임입니다.');
    }
    const userEntity = await this.userService._create({
      email: authDTO.email,
      password: authDTO.password,
      nickname: authDTO.nickname,
    });
    return `${userEntity.email}님의'회원가입 성공`;
  }
}
