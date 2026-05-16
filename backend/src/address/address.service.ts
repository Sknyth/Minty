import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class AddressService {
	constructor(private prisma: PrismaService) {}

	async createAddress(userId: number, addressData: Prisma.AddressUncheckedCreateInput){
		return this.prisma.address.create({
			data: {...addressData, userId}
		})
	}

	async fetchAddress(userId: number){
		return this.prisma.address.findMany({
			where: {userId},
		})
	}

	async updateAddress(addressId: number, addressData: Prisma.AddressUncheckedUpdateInput){
		return this.prisma.address.update({
			where: { id: addressId },
			data: addressData
		})
	}

	async deleteAddress(addressId: number){
		return this.prisma.address.delete({
			where: { id: addressId }
		})
	}
}
