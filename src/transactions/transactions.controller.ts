import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

import { TransactionsService } from './transactions.service';
import { CreateTransactionDto, UpdateTransactionDto } from './dto';
import { Auth, GetUser } from 'src/auth/decorators';

@Auth()
@Controller('transactions')
export class TransactionsController {
  constructor(
    private readonly transactionsService: TransactionsService,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  @Post()
  create(
    @Body() createTransactionDto: CreateTransactionDto,
    @GetUser('id') userId: string,
  ) {
    return this.transactionsService.create(createTransactionDto, userId);
  }

  @Get()
  findAll(@GetUser('id') userId: string) {
    return this.transactionsService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.transactionsService.findOne(id, userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransactionDto: UpdateTransactionDto,
    @GetUser('id') userId: string,
  ) {
    return this.transactionsService.update(id, updateTransactionDto, userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser('id') userId: string) {
    return this.transactionsService.remove(id, userId);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.cloudinaryService.uploadFile(file);
  }
}
