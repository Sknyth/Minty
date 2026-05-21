import { Prisma, Role, User } from '@prisma/client';
import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    createUser(data: Prisma.UserCreateInput): Promise<Omit<User, 'password'>>;
    searchUsers(query: string): Promise<{
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
    }[]>;
    getAllUsers(): Promise<User[]>;
    deleteUser(userId: number): Promise<{
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
    }>;
    updateRefreshToken(userId: number, body: {
        hashedRefreshToken: string;
    }): Promise<{
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
    }>;
    updateRole(userId: number, body: {
        role: Role;
    }): Promise<{
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
    }>;
    updateUser(id: number, data: {
        name: string;
        surname: string;
        phone: string;
    }): Promise<Omit<{
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
    }, "password">>;
    selectPayment(userId: number, body: {
        selectedPaymentId: number;
    }): Promise<Omit<{
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
    }, "password">>;
    selectAddress(userId: number, body: {
        selectedAddressId: number;
    }): Promise<Omit<{
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
    }, "password">>;
    changePass(userId: number, body: {
        oldPass: string;
        newPass: string;
    }): Promise<{
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
    }>;
    getUserByEmail(email: string): Promise<User | null>;
}
