import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { PostEntity } from './posts.entity';
import { PostsService } from './posts.service';


@Controller('posts')
export class PostsController {
    constructor(private readonly postservice: PostsService) {}
    
    @Get('getPosts')
    async findAll(): Promise<{statusCode: number, data: PostEntity[]}> {
        try{
            const posts = await this.postservice.findAll();
            if(!posts){
                throw new HttpException('Post Error', HttpStatus.NOT_FOUND);
            }
            return {"statusCode": HttpStatus.OK, data: posts}
        }catch(error){
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    
    @Post('createPost')
    async createPost(@Body() body: {textPost: string, license_user: string, teacher: string, nameCourse: string, idCourse: string, datePost: string}): Promise<{statusCode: number, data: PostEntity}> {
        const { textPost, license_user, teacher, nameCourse, idCourse, datePost} = body;
        try{
            const post = await this.postservice.registerPost(textPost, license_user, teacher, nameCourse, idCourse, datePost);
            if(!post){
                throw new HttpException('Post Error', HttpStatus.NOT_FOUND);
            }
            return {"statusCode": HttpStatus.OK, data: post}
        }catch(error){
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }
    
    
    
}
