import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { OrmConfig } from './database/ormConfig';
import { AccountsModule } from './accounts/accounts.module';
import { UsersModule } from './users/users.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(OrmConfig as TypeOrmModuleOptions),
    AccountsModule,
    UsersModule,
    TransactionsModule,
    AuthModule,
  ],
})
export class AppModule {}
