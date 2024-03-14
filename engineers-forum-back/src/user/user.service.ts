import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity'
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
    ){}


    async findAll(): Promise<UserEntity[]>{
        return this.userRepository.find();
    }

    async findUserById(userId: string): Promise<UserEntity>{
        return await this.userRepository.findOne({where: {name: userId}});
    }

    async registerUser(name: string, lastname: string, license: string, email: string, password: string): Promise<UserEntity>{
        return await this.userRepository.save({name: name, lastname: lastname, license: license, email: email, password:password});
    }
    
}