import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class CartService {
	constructor(private prisma: PrismaService) {}

	async addToCart(userId: number, productId: number, size?: number, quantity?: number) {
		return this.prisma.cart.create({
			data: { userId, productId, size, quantity: quantity ?? 1 },
		})
	}

	async getCartItems(userId: number) {
		return this.prisma.cart.findMany({
			where: { userId },
			include: { product: true },
		})
	}

	async removeFromCart(cartItemId: number) {
		return this.prisma.cart.delete({
			where: { id: cartItemId },
		})
	}

	async updateQuantity(id: number, quantity:number) {
		return this.prisma.cart.update({
			where: { id },
			data: { quantity}
		})
	}

}
