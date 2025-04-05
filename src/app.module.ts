import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { AppConfiguration, JoiValidationSchema } from './config';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [AppConfiguration],
      validationSchema: JoiValidationSchema,
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      ssl: process.env.NODE_ENV === 'prod',
      extra: {
        ssl:
          process.env.NODE_ENV === 'prod'
            ? { rejectUnauthorized: false }
            : false,
      },
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    TransactionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
