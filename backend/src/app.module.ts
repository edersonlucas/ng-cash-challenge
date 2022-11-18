import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { OrmConfig } from './database/ormConfig';

@Module({
  imports: [TypeOrmModule.forRoot(OrmConfig as TypeOrmModuleOptions)],
  controllers: [],
  providers: [],
})
export class AppModule {}
