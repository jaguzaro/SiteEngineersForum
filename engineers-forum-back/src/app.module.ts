import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';
import { UserEntity } from './user/user.entity';
import { PostEntity } from './posts/posts.entity';
import { PostsController } from './posts/posts.controller';
import { PostsService } from './posts/posts.service';
import { CommentsService } from './comments/comments.service';
import { CommentsController } from './comments/comments.controller';
import { CommentsEntity } from './comments/comments.entity';
import { NestFactory } from '@nestjs/core';

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
    TypeOrmModule.forFeature([UserEntity]),  TypeOrmModule.forFeature([PostEntity]),  TypeOrmModule.forFeature([CommentsEntity]),
  ],
  controllers: [AppController, UserController, PostsController, CommentsController],
  providers: [AppService, UserService, PostsService, CommentsService],
})
export class AppModule {
  constructor(){
    
  }
}
