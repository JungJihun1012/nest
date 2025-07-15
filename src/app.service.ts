import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(msg: string): string {
    return msg;
  }
  getMessage(): string {
    const msg: string = 'nestjs pratice';
    return this.getHello(msg);
  }
}