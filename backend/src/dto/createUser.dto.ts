import { IsNotEmpty, Matches, MinLength, IsString } from 'class-validator';
import { MessagesHelper, RegExHelper } from '../helpers';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Matches(RegExHelper.password, {
    message: MessagesHelper.PASSWORD_INVALID,
  })
  password: string;
}
