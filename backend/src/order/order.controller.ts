import { Body, Controller, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common'
import { CreateOrderDto } from './create-order.dto'
import { OrderService } from './order.service'
import { Order } from '@prisma/client'

@Controller('order')
export class OrderController {
	constructor(private order: OrderService) {}

	@Get('allOrders')
	async fetchAllOrders() {
		return this.order.fetchAllOrders()
	}

	@Get(':userId')
	async fetchOrders(@Param('userId', ParseIntPipe) userId: number) {
		return this.order.fetchOrders(userId)
	}

	@Post('create/:userId')
	async createOrder(
		@Param('userId', ParseIntPipe) userId: number, @Body() data: CreateOrderDto ) {
		return this.order.createOrder(userId, data)
	}

	@Patch('updateStatus/:orderId')
	async updateOrderStatus(
		@Param('orderId', ParseIntPipe) orderId: number, @Body() body: { newStatus: string }) {
		return this.order.updateOrderStatus(orderId, body.newStatus as Order['status'])
	}
}
