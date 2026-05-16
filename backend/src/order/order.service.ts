import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateOrderDto } from './create-order.dto'
import { Order } from '@prisma/client'

@Injectable()
export class OrderService {
	constructor(private prisma: PrismaService) {}

	async fetchOrders(userId: number) {
		return this.prisma.order.findMany({
      where: { userId }
    })
	}

  async fetchAllOrders(){
    return this.prisma.order.findMany()
  }

	async createOrder(userId: number, data: CreateOrderDto) {
  const { items, ...orderData } = data

  return this.prisma.order.create({
    data: {
      ...orderData,
      userId,
      items: {
        create: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          size: item.size,
          price: item.product.price,
        }))
      }
    }
  })

 }
  async updateOrderStatus(orderId: number, newStatus: Order['status']) {
    return this.prisma.order.update({
      where: { id: orderId },
      data: { status: newStatus }
    })
  }
}

