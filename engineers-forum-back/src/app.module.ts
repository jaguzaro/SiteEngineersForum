import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserEntity } from './user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'admin123',
      database: 'EngineersForum',
      entities: [__dirname + '/**/**/*.entity{.ts,.js}'],
      synchronize: false,
      insecureAuth: true
    }),
    TypeOrmModule.forFeature([UserEntity])
  ],
  controllers: [AppController, UserController],
  providers: [AppService, UserService]
})
export class AppModule {}
