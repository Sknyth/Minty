import { ProductsService } from './products.service';
import { Product } from '@prisma/client';
import { CreateProductDto } from './product.dto';
import { CloudinaryService } from "../cloudinary/cloudinary.service";
export declare class ProductsController {
    private readonly productService;
    private readonly cloudinaryService;
    constructor(productService: ProductsService, cloudinaryService: CloudinaryService);
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
    createProduct(productData: CreateProductDto, file: Express.Multer.File): Promise<Product>;
    updateProduct(productData: Partial<CreateProductDto>, id: number, file: Express.Multer.File): Promise<Product>;
    deleteProducts(): Promise<void>;
    deleteProductById(id: number): Promise<Product>;
    sortProducts(criteria: string): Promise<Product[]>;
}
