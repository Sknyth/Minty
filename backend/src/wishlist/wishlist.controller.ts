import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { WishlistService } from './wishlist.service'

@Controller('wishlist')
export class WishlistController {
	constructor(private wishlist: WishlistService) {}

	@Get(':userId')
	async fetchWishlist(@Param('userId', ParseIntPipe)
	userId: number) {
		return this.wishlist.fetchWishlist(userId)
	}

	@Post('add/:userId')
	async addToWishlist(@Param('userId', ParseIntPipe) userId: number, @Body('productId') productId: number) {
		return this.wishlist.addToWishlist(userId, productId)
	}

	@Delete('remove/:userId')
	async removeFromWishlist(@Param('userId', ParseIntPipe) userId: number, @Body('productId') productId: number) {
		return this.wishlist.removeFromWishlist(userId, productId)
	}
}
