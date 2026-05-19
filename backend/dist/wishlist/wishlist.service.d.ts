import { PrismaService } from "../prisma/prisma.service";
export declare class WishlistService {
    private prisma;
    constructor(prisma: PrismaService);
    fetchWishlist(userId: number): Promise<{
        id: number;
        created_at: Date;
        productId: number;
        userId: number;
    }[]>;
    addToWishlist(userId: number, productId: number): Promise<{
        id: number;
        created_at: Date;
        productId: number;
        userId: number;
    }>;
    removeFromWishlist(userId: number, productId: number): Promise<{
        id: number;
        created_at: Date;
        productId: number;
        userId: number;
    }>;
}
