import { PrismaService } from 'src/prisma/prisma.service';
export declare class CartService {
    private prisma;
    constructor(prisma: PrismaService);
    addToCart(userId: number, productId: number, size?: number, quantity?: number): Promise<{
        id: number;
        created_at: Date;
        quantity: number;
        size: number;
        productId: number;
        userId: number;
    }>;
    getCartItems(userId: number): Promise<({
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
        created_at: Date;
        quantity: number;
        size: number;
        productId: number;
        userId: number;
    })[]>;
    removeFromCart(cartItemId: number): Promise<{
        id: number;
        created_at: Date;
        quantity: number;
        size: number;
        productId: number;
        userId: number;
    }>;
    updateQuantity(id: number, quantity: number): Promise<{
        id: number;
        created_at: Date;
        quantity: number;
        size: number;
        productId: number;
        userId: number;
    }>;
    removeCart(userId: number): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
