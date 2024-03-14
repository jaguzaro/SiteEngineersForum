import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostEntity } from './posts.entity';
import { PostsService } from './posts.service';


@Controller('posts')
export class PostsController {
    constructor(private readonly postservice: PostsService) {}
    
    @Get('buscarPost')
    async findAll(): Promise<PostEntity[]> {
        return this.postservice.findAll();
    }
    
    @Post('createPost')
    async createPost(@Body() body: {textPost: string, license_user: string, teacher: string, nameCourse: string, idCourse: string, datePost: string}): Promise<PostEntity> {
        const { textPost, license_user, teacher, nameCourse, idCourse, datePost} = body;
        return this.postservice.registerPost(textPost, license_user, teacher, nameCourse, idCourse, datePost);
    }
    
    
    
}
