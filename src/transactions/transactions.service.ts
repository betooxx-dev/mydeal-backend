import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTransactionDto, UpdateTransactionDto } from './dto';
import { Response } from 'src/common/interfaces';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
  ) {}

  async create(
    createTransactionDto: CreateTransactionDto,
    userId: string,
  ): Promise<Response> {
    try {
      const transaction = await this.transactionsRepository.save({
        ...createTransactionDto,
        user: { id: userId },
      });

      return {
        message: 'Transaction created successfully',
        data: transaction,
      };
    } catch (error) {
      console.error('Error creating transaction:', error);
      throw new InternalServerErrorException(
        'An error occurred while creating the transaction',
        error.message,
      );
    }
  }

  async findAll(userID: string): Promise<Response> {
    try {
      const transactions = await this.transactionsRepository.find({
        where: { user: { id: userID }, deleted_at: null },
      });

      return {
        message: 'Transactions retrieved successfully',
        data: transactions,
      };
    } catch (error) {
      console.error('Error fetching transactions:', error);
      throw new InternalServerErrorException(
        'An error occurred while fetching transactions',
        error.message,
      );
    }
  }

  async findOne(id: string, userId: string): Promise<Response> {
    try {
      const transaction = await this.transactionsRepository.findOne({
        where: { id, user: { id: userId }, deleted_at: null },
      });

      if (!transaction) throw new NotFoundException('Transaction not found');

      return {
        message: 'Transaction retrieved successfully',
        data: transaction,
      };
    } catch (error) {
      console.error('Error fetching transaction:', error);
      throw new InternalServerErrorException(
        'An error occurred while fetching the transaction',
        error.message,
      );
    }
  }

  async update(
    id: string,
    updateTransactionDto: UpdateTransactionDto,
    userId: string,
  ): Promise<Response> {
    try {
      await this.findOne(id, userId);

      await this.transactionsRepository.update(id, updateTransactionDto);

      const updatedTransaction = await this.findOne(id, userId);

      return {
        message: 'Transaction updated successfully',
        data: updatedTransaction,
      };
    } catch (error) {
      console.error('Error updating transaction:', error);
      throw new InternalServerErrorException(
        'An error occurred while updating the transaction',
        error.message,
      );
    }
  }

  async remove(id: string, userId: string): Promise<Response> {
    try {
      await this.findOne(id, userId);

      await this.transactionsRepository.softDelete(id);

      return {
        message: 'Transaction deleted successfully',
        data: null,
      };
    } catch (error) {
      console.error('Error deleting transaction:', error);
      throw new InternalServerErrorException(
        'An error occurred while deleting the transaction',
        error.message,
      );
    }
  }
}
