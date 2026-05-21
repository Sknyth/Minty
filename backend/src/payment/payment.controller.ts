import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { PaymentService } from './payment.service'
import { Prisma } from '@prisma/client'


@Controller('payment')
export class PaymentController {
	constructor(private payment: PaymentService) {}

	@Post('add/:userId')
	async createPayment(@Param('userId', ParseIntPipe) userId: number ,@Body() data: Prisma.PaymentUncheckedCreateInput) {
		return this.payment.createPayment(userId, data);
	}

	@Get(':userId')
	async fetchPayment(@Param('userId', ParseIntPipe) userId: number){
		return this.payment.fetchPayment(userId);
	}

	@Delete('/delete/:paymentId')
	async deletePayment(@Param('paymentId', ParseIntPipe) paymentId: number) {
			return this.payment.deletePayment(paymentId);
	}
}
