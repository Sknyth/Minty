import { PrismaService } from "../prisma/prisma.service";
import { CreateOrderDto } from './create-order.dto';
import { Order } from '@prisma/client';
export declare class OrderService {
    private prisma;
    constructor(prisma: PrismaService);
    fetchOrders(userId: number): Promise<({
        items: ({
            product: {
                name: string;
                id: number;
                description: string;
                price: number;
                image_url: string;
                sizes: number[];
                created_at: Date;
            };
        } & {
            id: number;
            price: number;
            quantity: number;
            size: number;
            productId: number;
            orderId: number;
        })[];
    } & {
        id: number;
        created_at: Date;
        userId: number;
        cardNumber: string;
        cardHolderName: string;
        cardCvv: string;
        cardExpirationDate: string;
        cardType: string;
        shippingStreet: string;
        shippingCity: string;
        shippingCountry: string;
        shippingHouseNumber: string;
        shippingApt: string;
        shippingPostcode: string;
        customerName: string;
        customerSurname: string;
        customerEmail: string;
        total_price: number;
        status: import(".prisma/client").$Enums.OrderStatus;
    })[]>;
    fetchAllOrders(): Promise<({
        user: {
            name: string;
            id: number;
            created_at: Date;
            email: string;
            password: string;
            surname: string | null;
            phone: string | null;
            role: import(".prisma/client").$Enums.Role;
            hashedRefreshToken: string | null;
            selectedAddressId: number | null;
            selectedPaymentId: number | null;
        };
        items: ({
            product: {
                name: string;
                id: number;
                description: string;
                price: number;
                image_url: string;
                sizes: number[];
                created_at: Date;
            };
        } & {
            id: number;
            price: number;
            quantity: number;
            size: number;
            productId: number;
            orderId: number;
        })[];
    } & {
        id: number;
        created_at: Date;
        userId: number;
        cardNumber: string;
        cardHolderName: string;
        cardCvv: string;
        cardExpirationDate: string;
        cardType: string;
        shippingStreet: string;
        shippingCity: string;
        shippingCountry: string;
        shippingHouseNumber: string;
        shippingApt: string;
        shippingPostcode: string;
        customerName: string;
        customerSurname: string;
        customerEmail: string;
        total_price: number;
        status: import(".prisma/client").$Enums.OrderStatus;
    })[]>;
    createOrder(userId: number, data: CreateOrderDto): Promise<{
        id: number;
        created_at: Date;
        userId: number;
        cardNumber: string;
        cardHolderName: string;
        cardCvv: string;
        cardExpirationDate: string;
        cardType: string;
        shippingStreet: string;
        shippingCity: string;
        shippingCountry: string;
        shippingHouseNumber: string;
        shippingApt: string;
        shippingPostcode: string;
        customerName: string;
        customerSurname: string;
        customerEmail: string;
        total_price: number;
        status: import(".prisma/client").$Enums.OrderStatus;
    }>;
    updateOrderStatus(orderId: number, newStatus: Order['status']): Promise<{
        id: number;
        created_at: Date;
        userId: number;
        cardNumber: string;
        cardHolderName: string;
        cardCvv: string;
        cardExpirationDate: string;
        cardType: string;
        shippingStreet: string;
        shippingCity: string;
        shippingCountry: string;
        shippingHouseNumber: string;
        shippingApt: string;
        shippingPostcode: string;
        customerName: string;
        customerSurname: string;
        customerEmail: string;
        total_price: number;
        status: import(".prisma/client").$Enums.OrderStatus;
    }>;
    searchOrders(query: string): Promise<Order[]>;
}
