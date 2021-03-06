import { IsString, MinLength, MaxLength } from 'class-validator';

export class SignUpCredentialDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  password: string;
}
