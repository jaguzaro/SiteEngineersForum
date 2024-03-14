import { Injectable } from '@nestjs/common';
import { CommentsEntity } from './comments.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentsService {
    
    async getCommentsByPostId(idPost: number): Promise<CommentsEntity[]> {
        return this.commentRepository.find({ where: { idPost } });
    }

    constructor(
        @InjectRepository(CommentsEntity)
        private readonly commentRepository: Repository<CommentsEntity>,
    ){}

    async registerComment(textComment: string, idPost: number, license_user: string): Promise<CommentsEntity>{
        return await this.commentRepository.save({textComment: textComment, idPost: idPost, license_user: license_user});
    }
    

}