import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShortenerModule } from './shortener/shortener.module';
import { CommonModule } from './common/common.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      schema: process.env.DB_SCHEMA,
      synchronize: Boolean(process.env.DB_SYNC),
      autoLoadEntities: Boolean(process.env.DB_LOAD),
    }),
    ShortenerModule,
    CommonModule,
  ],
})
export class AppModule {}
