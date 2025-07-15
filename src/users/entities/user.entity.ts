import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import * as bcrypt from 'bcrypt';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  nickname: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  // 데이터베이스에 새로운 엔티티가 저장되기전에 자동으로 실행되는 메서드를 정의할 수 있다.
  @BeforeInsert()
  // 주어진 문자열을 해시화하여 반환하고, 이 함수는 동기식으로 작동하며 해시화가 완료 되기전까지 대기한다.
  private beforeInsert() {
    this.password = bcrypt.hashSync(this.password, 10);
  }
}
