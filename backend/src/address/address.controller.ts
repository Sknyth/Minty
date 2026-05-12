import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client'
import { AddressService } from './address.service'

@Controller('address')
export class AddressController {
	constructor(private address: AddressService) {}

	@Post('add/:userId')
	async createPayment(@Param('userId', ParseIntPipe) userId: number ,@Body() data: Prisma.AddressUncheckedCreateInput) {
		return this.address.createAddress(userId, data);
	}

	@Get(':userId')
	async fetchPayment(@Param('userId', ParseIntPipe) userId: number){
		return this.address.fetchAddress(userId);
	}

	@Delete('/delete/:addressId')
	async deletePayment(@Param('addressId', ParseIntPipe) addressId: number) {
			return this.address.deleteAddress(addressId);
	}
}
