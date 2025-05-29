import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AttachmentModule } from './modules/attachment/attachment.module';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { typeOrmConfig } from './configs/typeorm.config';
import { UserSeederService } from './seeds/user.seeder.service';
import { CountryModule } from './modules/country/country.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './modules/common/error-filters/http-exception.filter';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync(typeOrmConfig),
    ScheduleModule.forRoot(),
    AttachmentModule,
    CountryModule,
    AdminModule,

  ],
  controllers: [AppController],
  providers: [AppService, UserSeederService, 
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ]
})
export class AppModule { }
