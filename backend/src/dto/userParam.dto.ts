import { IsNotEmpty, MinLength, IsString } from 'class-validator';

export class UserParamDto {
  @IsNotEmpty()
  @IsString()
  accountId: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username: string;
}
