import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInCredentialDto } from './dto/signin-credential.dto';
import { SignUpCredentialDto } from './dto/signup-credential.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @Post('signup')
  signUp(
    @Body(ValidationPipe) signUpCredentialDto: SignUpCredentialDto,
  ): Promise<void> {
    return this.authService.signUp(signUpCredentialDto);
  }
  @Post('signin')
  signIn(@Body(ValidationPipe) signInCredentialDto: SignInCredentialDto) {
    return this.authService.signIn(signInCredentialDto);
  }
}
