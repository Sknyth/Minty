import { Prisma, Role, User } from '@prisma/client';
import { PrismaService } from "../prisma/prisma.service";
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(data: Prisma.UserCreateInput): Promise<Omit<User, 'password'>>;
    getUserByEmail(email: string): Promise<User | null>;
    getUserById(id: number): Promise<Omit<User, 'password'> | null>;
    getAllUsers(): Promise<User[]>;
    updateRefreshToken(userId: number, hashedRefreshToken: string): Promise<{
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
    updateUser(userId: number, name: string, surname: string, phone: string): Promise<Omit<User, 'password'>>;
    selectPayment(userId: number, selectedPaymentId: number | null): Promise<Omit<User, 'password'>>;
    selectAddress(userId: number, selectedAddressId: number): Promise<Omit<User, 'password'>>;
    updateRole(userId: number, newRole: Role): Promise<{
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
    searchUsers(query: string): Promise<User[]>;
    changePass(userId: number, oldPass: string, newPass: string): Promise<{
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
}
