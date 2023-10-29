import { Body, Controller, Delete, Get, HttpCode, Put, UsePipes, ValidationPipe, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { User } from './decorators/user.decorator';
import { UpdateDto } from './dto/user.dto';
import { IIds } from './user-interface';

@Controller('users')
export class UserController {
	constructor(
		private readonly UserService: UserService
	){}

	@Get('profile')
	@Auth()
	async getProfile(@User('_id') _id:string){
		return this.UserService.byId(_id)
	}

	@UsePipes(new ValidationPipe())
	@Put('profile')
	@HttpCode(200)
	@Auth()
	async updateProfile(@User('_id') _id:string, @Body() data: UpdateDto){
		return this.UserService.updateProfile(_id, data)
	}

	@Get('popular')
	@Auth()
	async getPopular(){
		return this.UserService.getPopularUser()
	}

	@Get('count')
	async getCountUsers() {
		return this.UserService.getCount()
	}

	@Put('sub')
	@Auth()
	async toggleSub(@User('_id') _id:string, @Body('subId') subId: string){
		return this.UserService.toggleSub({_id, subId})
	}

	@Put('toAdmin')
	@Auth('admin')
	async toAdmin(@Body() _id: string){
		return this.UserService.userToAdmin(_id)
	}

	@Delete('toBan')
	@Auth('admin')
	async delete(@Body() _id){
		return this.UserService.delete(_id)
	}
}
