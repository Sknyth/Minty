import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client'
import { PrismaService } from 'src/prisma/prisma.service'


@Injectable()
export class PaymentService {
	constructor(private prisma: PrismaService) {}

	async createPayment(userId: number, paymentData: Prisma.PaymentUncheckedCreateInput){
		return this.prisma.payment.create({
			data: {...paymentData, userId}
		})
	}

	async fetchPayment(userId: number){
		return this.prisma.payment.findMany({
			where: {userId},
		})
	}

	async deletePayment(paymentId: number){
		return this.prisma.payment.delete({
			where: { id: paymentId }
		})
	}
}
