import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'
import { Product } from '@prisma/client'
import { CreateProductDto } from './product.dto'


@Injectable()
export class ProductsService {
 constructor(private prisma: PrismaService) {}

	async fetchProducts(): Promise<Product[]> {
		return this.prisma.product.findMany()
	}

	async fetchProductById(id: number): Promise<Product | null> {
		return this.prisma.product.findUnique({ where: { id } })
	}

	async createProduct(productData: CreateProductDto): Promise<Product> {
		return this.prisma.product.create({ data: productData })
	}

	async deleteProducts() {
		await this.prisma.product.deleteMany()
	}
}
