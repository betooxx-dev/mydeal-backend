import {
  IsBoolean,
  IsDate,
  IsDecimal,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';
import { RecurringPeriod } from '../entities/transaction.entity';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsDecimal({ decimal_digits: '0,2' })
  amount: number;

  @IsBoolean()
  isExpense: boolean;

  @IsString()
  @MinLength(3)
  description: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsBoolean()
  isRecurring: boolean;

  @IsEnum(RecurringPeriod)
  @ValidateIf((o) => o.isRecurring === true)
  recurringPeriod: RecurringPeriod;

  @IsOptional()
  @IsUrl()
  receiptUrl?: string;

  @IsOptional()
  @IsString()
  location?: string;
}
