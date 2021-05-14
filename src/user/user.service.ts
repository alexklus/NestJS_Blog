import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SignUpCredentialDto } from './dto/signup.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}
  async addUser(signUpCredentialDto: SignUpCredentialDto) {
    return this.userRepository.addUser(signUpCredentialDto);
  }
}
