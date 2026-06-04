import { AuthService } from './auth.service';
import { Request as ExpressRequest } from 'express';
import type { JwtPayload } from './types';
import { UserService } from "../user/user.service";
export declare class AuthController {
    private readonly authService;
    private readonly userService;
    constructor(authService: AuthService, userService: UserService);
    signIn(data: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
        refresh_token: string;
    } | null>;
    getProfile(req: ExpressRequest & {
        user: JwtPayload;
    }): Promise<Omit<{
        name: string;
        id: number;
        email: string;
        password: string;
        surname: string | null;
        phone: string | null;
        role: import(".prisma/client").$Enums.Role;
        created_at: Date;
        hashedRefreshToken: string | null;
        selectedAddressId: number | null;
        selectedPaymentId: number | null;
    }, "password"> | null>;
    refresh(data: {
        refresh_token: string;
    }): Promise<{
        access_token: string;
    } | null>;
}
