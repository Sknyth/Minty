import { WishlistService } from './wishlist.service';
export declare class WishlistController {
    private wishlist;
    constructor(wishlist: WishlistService);
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
