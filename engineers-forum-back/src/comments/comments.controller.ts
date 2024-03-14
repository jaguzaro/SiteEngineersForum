import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsEntity } from './comments.entity';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsservice: CommentsService) {}

    @Post('createComment')
    async createPost(@Body() body: {textComment: string, idPost: number, license_user: string}): Promise<{statusCode: number, data: CommentsEntity}> {
        const { textComment, idPost, license_user} = body;
        try{
            const comment = await this.commentsservice.registerComment(textComment, idPost, license_user);
            if(!comment){
                throw new HttpException('Post Error', HttpStatus.NOT_FOUND);
            }
            return {"statusCode": HttpStatus.OK, "data": comment}
        }catch(error){
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
    
    @Post('getCommentsByPostId')
    async getCommentsByPostId(@Body() body: { idPost: number }): Promise<{statusCode: number, data: CommentsEntity[]}> {
        const { idPost } = body;
        this.commentsservice.getCommentsByPostId(idPost);
        try{
            const comment = await this.commentsservice.getCommentsByPostId(idPost);
            if(!comment){
                throw new HttpException('Post Error', HttpStatus.NOT_FOUND);
            }
            return {"statusCode": HttpStatus.OK, "data": comment}
        }catch(error){
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
