import {
  IsNotEmpty,
  IsPositive,
  IsString,
  MinLength,
  IsNumber,
} from 'class-validator';
import { MessagesHelper } from '../helpers';

export class TransferDto {
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 }, { message: MessagesHelper.VALUE_INVALID })
  @IsPositive()
  value: number;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  userReceive: string;
}
