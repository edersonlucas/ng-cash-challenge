import { IsNotEmpty, MinLength, IsString } from 'class-validator';

export class PayloadJwtDto {
  @IsNotEmpty()
  @IsString()
  sub: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  username: string;
}
