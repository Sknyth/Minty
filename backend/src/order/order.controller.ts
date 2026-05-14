import { Controller, Post, Get, ParseIntPipe, Param, Body } from '@nestjs/common';
import { OrderService } from './order.service'
import { CreateOrderDto } from './create-order.dto'

@Controller('order')
export class OrderController {
	constructor(private order: OrderService) {}

	@Get(':userId')
	async fetchOrders(@Param('userId', ParseIntPipe) userId: number) {
		return this.order.fetchOrders(userId)
	}

	@Post('create/:userId')
	async createOrder(
		@Param('userId', ParseIntPipe) userId: number, @Body() data: CreateOrderDto ) {
		return this.order.createOrder(userId, data)
	}
}
