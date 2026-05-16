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

	async deleteProductById(id: number): Promise<Product> {
		return this.prisma.product.delete({ where: { id } })
	}

	async updateProduct(id: number, productData: Partial<CreateProductDto>): Promise<Product> {
		return this.prisma.product.update({ where: { id }, data: productData })
	}
	
	async searchProducts(query: string): Promise<Product[]> {
		return this.prisma.product.findMany({
			where: {
				name: {
					contains: query,
					mode: 'insensitive',
				},
			},
		})
	}

	async sortProducts(criteria: string): Promise<Product[]> {
		let orderBy: { [key: string]: 'asc' | 'desc' } = { id: 'asc' }

		if (criteria === 'price-low') {
			orderBy = { price: 'asc' }
		} else if (criteria === 'price-high') {
			orderBy = { price: 'desc' }
		} else if (criteria === 'name') {
			orderBy = { name: 'asc' }
		}

		return this.prisma.product.findMany({ orderBy })
	}

}
