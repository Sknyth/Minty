import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query } from '@nestjs/common'
import { ProductsService } from './products.service'
import { Product } from '@prisma/client'
import { CreateProductDto } from './product.dto'
import { Public } from 'src/auth/public.decorator'


@Controller()
export class ProductsController {
	constructor(private readonly productService: ProductsService) {}

	@Public()
	@Get('search')
	searchProducts(@Query('query') query: string): Promise<Product[]> {
		return this.productService.searchProducts(query);
	}

	@Public()
	@Get()
	fetchProducts() {
		return this.productService.fetchProducts();
	}

	@Post('create')
	createProduct(@Body() productData: CreateProductDto): Promise<Product> {
		return this.productService.createProduct(productData);
	}

	@Delete()
	deleteProducts() {
		return this.productService.deleteProducts();
	}

	@Patch('update/:id')
	updateProduct(@Body() productData: Partial<CreateProductDto>, @Param('id', ParseIntPipe) id: number): Promise<Product> {
		return this.productService.updateProduct(id, productData);
	}

	@Delete('delete/:id')
	deleteProductById(@Param('id', ParseIntPipe) id: number): Promise<Product> {
		return this.productService.deleteProductById(id);
	}


	@Public()
	@Get('sort')
	sortProducts(@Query('criteria') criteria: string): Promise<Product[]> {
		return this.productService.sortProducts(criteria);
	}
}