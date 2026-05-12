import { Body, Controller, Delete, Get, Post } from '@nestjs/common'
import { ProductsService } from './products.service'
import { Product } from '@prisma/client'
import { CreateProductDto } from './product.dto'
import { Public } from 'src/auth/public.decorator'


@Controller()
export class ProductsController {
	constructor(private readonly productService: ProductsService) {}

	@Public()
	@Get()
	fetchProducts() {
		return this.productService.fetchProducts();
	}

	@Public()
	@Post()
	createProduct(@Body() productData: CreateProductDto): Promise<Product> {
		return this.productService.createProduct(productData);
	}

	@Delete()
	deleteProducts() {
		return this.productService.deleteProducts();
	}
}