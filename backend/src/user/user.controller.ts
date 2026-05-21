import { Controller, Get, Param, Post, Body, Patch, ParseIntPipe, Delete, Query } from '@nestjs/common';
import { Prisma, Role, User } from '@prisma/client'
import { UserService } from './user.service'
import { Public } from 'src/auth/public.decorator'


@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Public()
	@Post()
	async createUser(@Body() data: Prisma.UserCreateInput): Promise<Omit<User, 'password'>> {
		return this.userService.createUser(data);
	}

	@Get('search')
	async searchUsers(@Query('query') query: string) {
		return this.userService.searchUsers(query)
	}

	@Get('allUsers')
	async getAllUsers(): Promise<User[]> {
		return this.userService.getAllUsers();
	}

	@Delete('delete/:userId')
	async deleteUser(@Param('userId', ParseIntPipe) userId: number) {
		return this.userService.deleteUser(userId);
	}

	@Patch('updateRefreshToken/:userId')
	async updateRefreshToken(@Param('userId', ParseIntPipe) userId: number, @Body() body: { hashedRefreshToken: string }) {
		return this.userService.updateRefreshToken(userId, body.hashedRefreshToken);
	}

	@Patch('updateRole/:userId')
	async updateRole(@Param('userId', ParseIntPipe) userId: number, @Body() body: { role: Role }) {
		return this.userService.updateRole(userId, body.role);
	}

	@Patch('update/:id')
	async updateUser(@Param('id', ParseIntPipe) id: number, @Body() data:{ name: string, surname: string, phone: string}){
		return this.userService.updateUser(id, data.name, data.surname, data.phone);
	}

	@Patch('selectPayment/:userId')
	async selectPayment(@Param('userId', ParseIntPipe) userId: number, @Body() body: { selectedPaymentId: number}){
		return this.userService.selectPayment(userId, body.selectedPaymentId);
	}

	@Patch('selectAddress/:userId')
	async selectAddress(@Param('userId', ParseIntPipe) userId: number, @Body() body: { selectedAddressId: number}){
		return this.userService.selectAddress(userId, body.selectedAddressId);
	}

	@Get(':email')
	async getUserByEmail(@Param('email') email: string): Promise<User | null> {
		return this.userService.getUserByEmail(email);
	}
}
