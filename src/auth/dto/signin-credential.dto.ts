import { IsNotEmpty } from 'class-validator';

export class SignInCredentialDto {
  @IsNotEmpty()
  username: string;
  @IsNotEmpty()
  password: string;
}
