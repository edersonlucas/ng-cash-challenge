import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { OrmConfig } from './database/ormConfig';
import { AccountsModule } from './accounts/accounts.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(OrmConfig as TypeOrmModuleOptions),
    AccountsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
