import { User } from 'src/auth/entities/user.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum RecurringPeriod {
  NONE = 'none',
  DAILY = 'daily',
  WEEKLY = 'weekly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column('boolean', { default: true })
  isExpense: boolean;

  @Column('text')
  description: string;

  @Column('text')
  category: string;

  @Column('date')
  date: Date;

  @Column('boolean', { default: false })
  isRecurring: boolean;

  @Column({
    type: 'enum',
    enum: RecurringPeriod,
    default: RecurringPeriod.NONE,
  })
  recurringPeriod: RecurringPeriod;

  @Column('text', { nullable: true })
  receiptUrl: string;

  @Column('text', { nullable: true })
  location: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn({ select: false })
  created_at: Date;

  @UpdateDateColumn({ select: false, nullable: true })
  updated_at: Date;

  @DeleteDateColumn({ select: false, nullable: true })
  deleted_at: Date;

  @BeforeInsert()
  checkFieldsBeforeInsert() {
    if (this.amount < 0) this.amount = Math.abs(this.amount);
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldsBeforeInsert();
  }
}
