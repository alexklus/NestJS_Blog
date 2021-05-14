import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserRepository } from 'src/user/user.repository';
import { SignUpCredentialDto } from './dto/signup-credential.dto';
import * as bcrypt from 'bcrypt';
import { jwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}
  async signUp(signUpCredentialDto: SignUpCredentialDto): Promise<void> {
    return await this.userRepository.addUser(signUpCredentialDto);
  }

  async signIn(signInCredentialDto: SignUpCredentialDto) {
    const { username, password } = signInCredentialDto;
    const user = await this.userRepository.findOne({ username });

    if (user && (await this.validatePassword(user, password))) {
      const payload: jwtPayload = { username };
      const accessToken = await this.jwtService.signAsync(payload);
      return { accessToken: accessToken };
    } else {
      throw new UnauthorizedException('Invalid credentials!');
    }
  }

  private async validatePassword(
    user: User,
    password: string,
  ): Promise<boolean> {
    const hash = await bcrypt.hash(password, user.salt);
    return hash === user.password;
  }
}
