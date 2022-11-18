import {
  IsNotEmpty,
  IsPositive,
  IsString,
  MinLength,
  IsNumber,
} from 'class-validator';

export class TransferDto {
  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  value: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  userReceive: string;
}
