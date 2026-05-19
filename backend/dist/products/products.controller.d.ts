import { ProductsService } from './products.service';
import { Product } from '@prisma/client';
import { CreateProductDto } from './product.dto';
export declare class ProductsController {
    private readonly productService;
    constructor(productService: ProductsService);
    searchProducts(query: string): Promise<Product[]>;
    fetchProducts(): Promise<{
        name: string;
        id: number;
        description: string;
        price: number;
        image_url: string;
        sizes: number[];
        created_at: Date;
    }[]>;
    createProduct(productData: CreateProductDto): Promise<Product>;
    deleteProducts(): Promise<void>;
    updateProduct(productData: Partial<CreateProductDto>, id: number): Promise<Product>;
    deleteProductById(id: number): Promise<Product>;
    sortProducts(criteria: string): Promise<Product[]>;
}
