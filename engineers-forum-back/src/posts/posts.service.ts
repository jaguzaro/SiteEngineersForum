import { Injectable } from '@nestjs/common';
import { PostEntity } from './posts.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';


@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(PostEntity)
        private readonly postRepository: Repository<PostEntity>,
    ){}
    
    async findAll(): Promise<PostEntity[]>{
        return this.postRepository.find();
    }
    
    async registerPost(textPost: string, license_user: string, teacher: string, nameCourse: string, idCourse: string, datePost: string): Promise<PostEntity>{
        return await this.postRepository.save({textPost: textPost, license_user: license_user, teacher: teacher, nameCourse: nameCourse, idCourse: idCourse, datePost: datePost});
    }
    
    
    
}

