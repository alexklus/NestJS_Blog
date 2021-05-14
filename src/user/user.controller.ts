import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  ValidationPipe,
} from '@nestjs/common';
import { SignUpCredentialDto } from './dto/signup.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/:username')
  getUserByUsername(@Param('username') username: string) {
    return username;
  }
  @Post()
  addUser(@Body(ValidationPipe) signUpCredentialDto: SignUpCredentialDto) {
    return this.userService.addUser(signUpCredentialDto);
  }
}
