import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity'
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    updateUser(userId: number, userData: Partial<UserEntity>): UserEntity | PromiseLike<UserEntity> {
      throw new Error('Method not implemented.');
    }

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
    
    /*async updateUser(userId: number, userData: Partial<UserEntity>): Promise<UserEntity> {
        const user = await this.userRepository.findOne({where: {id: userId}});
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }
        Object.assign(user, userData);
        
        return await this.userRepository.update({id: userId}, {name: user.name, lastname: user.lastname, email: user.email, password: user.password});
    } */
    
    
    
    
}