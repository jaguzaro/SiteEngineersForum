import { Injectable, NotFoundException } from '@nestjs/common';
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
        return await this.userRepository.findOne({where: {license: userId}});
    }

    async registerUser(name: string, lastname: string, license: string, email: string, password: string): Promise<UserEntity>{
        return await this.userRepository.save({name: name, lastname: lastname, license: license, email: email, password:password});
    }
    
    async updateUserPassword(carnet:string, newPassword: string): Promise<UserEntity> {
        const userToUpdate = await this.userRepository.findOne({ where: {license: carnet}});
    
        if (!userToUpdate) {
          throw new Error('Usuario no encontrado');
        }
    
        userToUpdate.password = newPassword;
    
        const updatedUser = await this.userRepository.save(userToUpdate);
    
        return updatedUser;
      }
    
    async updateUser(license: string, name: string, lastname: string, email: string): Promise<UserEntity>{
        const userToUpdate = await this.userRepository.findOne({ where: {license: license}});
    
        if (!userToUpdate) {
          throw new Error('Usuario no encontrado');
        }
    
        userToUpdate.name = name;
        userToUpdate.lastname = lastname;
        userToUpdate.email = email;
    
        const updatedUser = await this.userRepository.save(userToUpdate);
    
        return updatedUser;
      }
    
    
    
}