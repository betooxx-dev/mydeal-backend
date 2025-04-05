import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/auth/entities/user.entity';
import { Transaction } from './entities/transaction.entity';
import { AuthModule } from 'src/auth/auth.module';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [TransactionsController],
  providers: [TransactionsService],
  imports: [
    TypeOrmModule.forFeature([User, Transaction]),
    AuthModule,
    HttpModule,
    ConfigModule,
  ],
})
export class TransactionsModule {}
