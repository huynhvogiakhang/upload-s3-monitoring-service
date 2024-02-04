import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JwtStrategyModule } from './core/auth/auth.module';
import { S3Module } from './core/aws/aws.module';
import { DatabaseModule } from './core/database/database.module';
import { LoggingMiddleware } from './core/logger/logger.middleware';
import { LoggerModule } from './core/logger/logger.module';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    LoggerModule,
    JwtStrategyModule,
    S3Module,
    UploadModule,
    DatabaseModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtStrategyModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
