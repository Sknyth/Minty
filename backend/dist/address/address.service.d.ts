import { Prisma } from '@prisma/client';
import { PrismaService } from "../prisma/prisma.service";
export declare class AddressService {
    private prisma;
    constructor(prisma: PrismaService);
    createAddress(userId: number, addressData: Prisma.AddressUncheckedCreateInput): Promise<{
        id: number;
        created_at: Date;
        userId: number;
        street: string;
        city: string;
        house_number: string;
        country: string;
        apt: string;
        postcode: string;
    }>;
    fetchAddress(userId: number): Promise<{
        id: number;
        created_at: Date;
        userId: number;
        street: string;
        city: string;
        house_number: string;
        country: string;
        apt: string;
        postcode: string;
    }[]>;
    updateAddress(addressId: number, addressData: Prisma.AddressUncheckedUpdateInput): Promise<{
        id: number;
        created_at: Date;
        userId: number;
        street: string;
        city: string;
        house_number: string;
        country: string;
        apt: string;
        postcode: string;
    }>;
    deleteAddress(addressId: number): Promise<{
        id: number;
        created_at: Date;
        userId: number;
        street: string;
        city: string;
        house_number: string;
        country: string;
        apt: string;
        postcode: string;
    }>;
}
