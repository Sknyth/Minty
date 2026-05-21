import { PrismaService } from '../prisma/prisma.service';
import { Product } from '@prisma/client';
import { CreateProductDto } from './product.dto';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    fetchProducts(): Promise<Product[]>;
    fetchProductById(id: number): Promise<Product | null>;
    createProduct(productData: CreateProductDto): Promise<Product>;
    deleteProducts(): Promise<void>;
    deleteProductById(id: number): Promise<Product>;
    updateProduct(id: number, productData: Partial<CreateProductDto>): Promise<Product>;
    searchProducts(query: string): Promise<Product[]>;
    sortProducts(criteria: string): Promise<Product[]>;
}
