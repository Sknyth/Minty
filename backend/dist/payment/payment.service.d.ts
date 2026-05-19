import { Prisma } from '@prisma/client';
import { PrismaService } from "../prisma/prisma.service";
export declare class PaymentService {
    private prisma;
    constructor(prisma: PrismaService);
    createPayment(userId: number, paymentData: Prisma.PaymentUncheckedCreateInput): Promise<{
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
