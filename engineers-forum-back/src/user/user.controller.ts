import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

  @Get('getUsers')
  async findAll(): Promise<{ statusCode: number; data: UserEntity[] }> {
    try {
        const user = await this.userService.findAll();
        if (!user) {
          throw new HttpException('Users not found', HttpStatus.NOT_FOUND);
        }
        return { "statusCode": HttpStatus.OK, data: user };
      } catch (error) {
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

  @Post('profile')
  async getUserById(@Body('license') license: string): Promise<{ statusCode: number; data: UserEntity[] }>{
    try {
        const user = await this.userService.findUserById(license);
        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return { "statusCode": HttpStatus.OK, data: [user] };
      } catch (error) {
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

  @Post('registerUser')
  async registerUser(@Body() body: { name: string, lastname: string, license: string, email: string, password: string }): Promise<{statusCode: number; data:UserEntity}>{
        const { name, lastname, license, email, password } = body;
        try{
            const registerUser = await this.userService.registerUser(name, lastname, license, email, password);
            if(!registerUser){
                throw new HttpException('Post Error', HttpStatus.NOT_FOUND);
            }
            return {"statusCode": HttpStatus.OK, data: registerUser}
        }catch(error){
            throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
        
    }
    
    @Put('update-password')
    async updateUserPassword(
      @Body('password') newPassword: string,
      @Body('carnet') carnet: string,
    ): Promise<{statusCode:number, data: UserEntity}> {
      try{
        const updateUser = await this.userService.updateUserPassword(carnet, newPassword);
        if(!updateUser){
            throw new HttpException('update Error', HttpStatus.NOT_FOUND);
        }
        return {"statusCode": HttpStatus.OK, data: updateUser}
      }catch(error){
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    @Put('update-user')
    async updateUser(
      @Body('email') email: string,
      @Body('lastname') lastname: string,
      @Body('name') name: string,
      @Body('license') license: string,
    ): Promise<{statusCode:number, data: UserEntity}> {
      try{
        const updateUser = await this.userService.updateUser(license, name, lastname, email);
        if(!updateUser){
            throw new HttpException('update Error', HttpStatus.NOT_FOUND);
        }
        return {"statusCode": HttpStatus.OK, data: updateUser}
      }catch(error){
        throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
}
