import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class ParseDatePipe implements PipeTransform<string, Date> {
  transform(value: string): Date {
    if (!value) return undefined;

    const date = new Date(value);

    if (isNaN(date.getTime()))
      throw new BadRequestException('Formato de fecha inválido');

    return date;
  }
}
