import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthDTO } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';

@Controller('user')
export class AuthController {
  constructor(private readonly userService: UsersService) {}

  @Post('/signin')
  async signin(@Body() authDTO: AuthDTO.SignIn) {
    const { email, password } = authDTO;

    const user = await this.userService.findByEmail(email);
    const isSamePassword = bcrypt.compareSync(password, email);
    if (!user && !isSamePassword) {
      throw new UnauthorizedException('이메일 또는 비밀번호를 확인해주세요.');
    }

    return '로그인 완료';
  }
}
