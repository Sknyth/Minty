import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { Prisma } from '@prisma/client'
import { AddressService } from './address.service'

@Controller('address')
export class AddressController {
	constructor(private address: AddressService) {}

	@Patch('update/:addressId')
	async updateAddress(@Param('addressId', ParseIntPipe) addressId: number, @Body() data: Prisma.AddressUncheckedUpdateInput) {
		return this.address.updateAddress(addressId, data);
	}

	@Post('add/:userId')
	async createAddress(@Param('userId', ParseIntPipe) userId: number ,@Body() data: Prisma.AddressUncheckedCreateInput) {
		return this.address.createAddress(userId, data);
	}

	@Delete('/delete/:addressId')
	async deleteAddress(@Param('addressId', ParseIntPipe) addressId: number) {
			return this.address.deleteAddress(addressId);
	}

	@Get(':userId')
	async fetchPayment(@Param('userId', ParseIntPipe) userId: number){
		return this.address.fetchAddress(userId);
	}


}
