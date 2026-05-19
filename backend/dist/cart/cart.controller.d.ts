import { CartService } from './cart.service';
export declare class CartController {
    private cart;
    constructor(cart: CartService);
    addToCart(userId: number, data: {
        productId: number;
        size?: number;
        quantity?: number;
    }): Promise<{
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
    removeFromCart({ productId }: {
        productId: number;
    }): Promise<{
        id: number;
        created_at: Date;
        quantity: number;
        size: number;
        productId: number;
        userId: number;
    }>;
    updateQuantity({ productId, quantity }: {
        productId: number;
        quantity: number;
    }): Promise<{
        id: number;
        created_at: Date;
        quantity: number;
        size: number;
        productId: number;
        userId: number;
    }>;
    removeCart(userId: number): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
