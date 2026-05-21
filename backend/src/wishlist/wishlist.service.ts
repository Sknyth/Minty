import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class WishlistService {
	constructor(private prisma: PrismaService) {}

	async fetchWishlist(userId: number){
		return this.prisma.wishlist.findMany({
			where: {userId}
		})
	}

	async addToWishlist(userId: number, productId: number ) {
		return this.prisma.wishlist.create({
			data: {userId, productId}
		})
	}

	async removeFromWishlist(userId: number, productId: number) {
    return this.prisma.wishlist.delete({
        where: { userId_productId: { userId, productId } }
    })
}
}
