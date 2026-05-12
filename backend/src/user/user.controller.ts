import { Controller, Get, Param, Post, Body, Patch, ParseIntPipe } from '@nestjs/common';
import { Prisma, User } from '@prisma/client'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Post()
	async createUser(@Body() data: Prisma.UserCreateInput): Promise<Omit<User, 'password'>> {
		return this.userService.createUser(data);
	}

	@Get(':email')
	async getUserByEmail(@Param('email') email: string): Promise<User | null> {
		return this.userService.getUserByEmail(email);
	}

	@Get()
	async getAllUsers(): Promise<User[]> {
		return this.userService.getAllUsers();
	}

	@Patch('update/:id')
	async updateUser(@Param('id', ParseIntPipe) id: number, @Body() data:{ name: string, surname: string, phone: string}){
		return this.userService.updateUser(id, data.name, data.surname, data.phone);
	}

	@Patch('selectPayment/:userId')
	async selectPayment(@Param('userId', ParseIntPipe) userId: number, @Body() body: { selectedPaymentId: number}){
		return this.userService.selectPayment(userId, body.selectedPaymentId);
	}
}
