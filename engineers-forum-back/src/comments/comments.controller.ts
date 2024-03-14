import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsEntity } from './comments.entity';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsservice: CommentsService) {}

    @Post('createComment')
    async createPost(@Body() body: {textComment: string, idPost: number, license_user: string}): Promise<CommentsEntity> {
        const { textComment, idPost, license_user} = body;
        return this.commentsservice.registerComment(textComment, idPost, license_user);
    }
    
    @Post('getCommentsByPostId')
    async getCommentsByPostId(@Body() body: { idPost: number }): Promise<CommentsEntity[]> {
        const { idPost } = body;
        return this.commentsservice.getCommentsByPostId(idPost);}
}
