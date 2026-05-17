import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service'
import { CreateOrderDto } from './create-order.dto'
import { Order, OrderStatus } from '@prisma/client'

@Injectable()
export class OrderService {
	constructor(private prisma: PrismaService) {}

	async fetchOrders(userId: number) {
		return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })
	}

  async fetchAllOrders(){
    return this.prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true
          }
        },
        user: true
      }
    })
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

  async searchOrders(query: string): Promise<Order[]> {
    const id = parseInt(query);

    const validStatuses = ['pending', 'delivered', 'cancelled'];
    const statusMatch = validStatuses.includes(query) ? query as OrderStatus : undefined;

    return this.prisma.order.findMany({
      where: {
        OR: [
          ...(isNaN(id) ? [] : [{ id }]),
          { customerName: { contains: query, mode: 'insensitive' } },
          { customerSurname: { contains: query, mode: 'insensitive' } },
          { customerEmail: { contains: query, mode: 'insensitive' } },
          ...(statusMatch ? [{ status: statusMatch }] : []),
        ]
      },
      include: {
        items: true,
        user: true,
      }
    })
  }
}

