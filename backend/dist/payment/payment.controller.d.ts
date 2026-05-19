import { PaymentService } from './payment.service';
import { Prisma } from '@prisma/client';
export declare class PaymentController {
    private payment;
    constructor(payment: PaymentService);
    createPayment(userId: number, data: Prisma.PaymentUncheckedCreateInput): Promise<{
        number: string;
        id: number;
        created_at: Date;
        userId: number;
        holder_name: string;
        cvv: string;
        expiration_date: string;
        type: string;
    }>;
    fetchPayment(userId: number): Promise<{
        number: string;
        id: number;
        created_at: Date;
        userId: number;
        holder_name: string;
        cvv: string;
        expiration_date: string;
        type: string;
    }[]>;
    deletePayment(paymentId: number): Promise<{
        number: string;
        id: number;
        created_at: Date;
        userId: number;
        holder_name: string;
        cvv: string;
        expiration_date: string;
        type: string;
    }>;
}
