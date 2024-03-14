import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { UserEntity } from './user.entity';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

  @Get('')
  async findAll(): Promise<UserEntity[]> {
        return this.userService.findAll();
    }

  @Post('profile')
  async getUserById(@Body('name') name: string): Promise<UserEntity>{
        return this.userService.findUserById((name));
    }

  @Post('registerUser')
  async registerUser(@Body() body: { name: string, lastname: string, license: string, email: string, password: string }): Promise<UserEntity>{
        const { name, lastname, license, email, password } = body;
        return this.userService.registerUser(name, lastname, license, email, password);
    }
}

