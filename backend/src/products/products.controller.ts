import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common'
import { ProductsService } from './products.service'
import { Product } from '@prisma/client'
import { CreateProductDto } from './product.dto'
import { Public } from 'src/auth/public.decorator'
import { CloudinaryService } from 'src/cloudinary/cloudinary.service'
import { FileInterceptor } from '@nestjs/platform-express'
import { memoryStorage } from 'multer'

@Controller()
export class ProductsController {
	constructor(
		private readonly productService: ProductsService,
		private readonly cloudinaryService: CloudinaryService
	) {}

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
	@UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
	async createProduct(
		@Body() productData: CreateProductDto,
		@UploadedFile() file: Express.Multer.File
	): Promise<Product> {
		const image_url = file ? await this.cloudinaryService.uploadImage(file) : productData.image_url
		const sizes = Array.isArray(productData.sizes) ? productData.sizes : JSON.parse(String(productData.sizes)) as number[]
		return this.productService.createProduct({ 
			...productData,
			price: Number(productData.price),
			sizes,
			image_url 
		})
	}

	@Patch('update/:id')
	@UseInterceptors(FileInterceptor('image', { storage: memoryStorage() }))
	async updateProduct(@Body() productData: Partial<CreateProductDto>, @Param('id', ParseIntPipe) id: number, @UploadedFile() file: Express.Multer.File): Promise<Product> {
		const image_url = file ? await this.cloudinaryService.uploadImage(file) : productData.image_url

		const sizes = Array.isArray(productData.sizes) ? productData.sizes : JSON.parse(String(productData.sizes)) as number[]



		return this.productService.updateProduct(id, {
			...productData,price: Number(productData.price),
			sizes,
			image_url 
		});
	}

	@Delete()
	deleteProducts() {
		return this.productService.deleteProducts();
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