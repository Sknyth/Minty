import { Prisma } from '@prisma/client';
import { AddressService } from './address.service';
export declare class AddressController {
    private address;
    constructor(address: AddressService);
    updateAddress(addressId: number, data: Prisma.AddressUncheckedUpdateInput): Promise<{
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
    createAddress(userId: number, data: Prisma.AddressUncheckedCreateInput): Promise<{
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
    fetchPayment(userId: number): Promise<{
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
}
