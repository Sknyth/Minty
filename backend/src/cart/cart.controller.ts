import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CartService } from './cart.service'

@Controller('cart')
export class CartController {
	constructor(private cart: CartService) {}

	@Post('add/:userId')
	async addToCart(@Param('userId', ParseIntPipe) userId: number, @Body() data: { productId: number, size?: number, quantity?: number }) {
		return this.cart.addToCart(userId, data.productId, data.size, data.quantity);
	}

	@Get(':userId')
  async getCartItems(@Param('userId', ParseIntPipe) userId: number) {
    return this.cart.getCartItems(userId);
  }

  @Delete('remove')
  async removeFromCart(@Body() { productId }: { productId: number }) {
    return this.cart.removeFromCart(productId);
  }

  @Patch('updateQuantity')
  async updateQuantity(@Body() {productId, quantity}: {productId: number, quantity: number}) {
    return this.cart.updateQuantity(productId, quantity);
  }

  @Delete('removeCart/:userId')
  async removeCart(@Param('userId', ParseIntPipe) userId: number) {
    return this.cart.removeCart(userId)
  }
}

