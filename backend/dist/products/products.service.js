"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ProductsService = class ProductsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async fetchProducts() {
        return this.prisma.product.findMany();
    }
    async fetchProductById(id) {
        return this.prisma.product.findUnique({ where: { id } });
    }
    async createProduct(productData) {
        return this.prisma.product.create({ data: productData });
    }
    async deleteProducts() {
        await this.prisma.product.deleteMany();
    }
    async deleteProductById(id) {
        return this.prisma.product.delete({ where: { id } });
    }
    async updateProduct(id, productData) {
        return this.prisma.product.update({ where: { id }, data: productData });
    }
    async searchProducts(query) {
        const id = parseInt(query);
        const sizes = parseInt(query);
        return this.prisma.product.findMany({
            where: {
                OR: [
                    ...(isNaN(id) ? [] : [{ id }]),
                    { name: { contains: query, mode: 'insensitive', } },
                    ...(isNaN(sizes) ? [] : [{ sizes: { has: sizes } }])
                ]
            },
        });
    }
    async sortProducts(criteria) {
        let orderBy = { id: 'asc' };
        if (criteria === 'price-low') {
            orderBy = { price: 'asc' };
        }
        else if (criteria === 'price-high') {
            orderBy = { price: 'desc' };
        }
        else if (criteria === 'name') {
            orderBy = { name: 'asc' };
        }
        else if (criteria === 'standard') {
            orderBy = { id: 'asc' };
        }
        return this.prisma.product.findMany({ orderBy });
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ProductsService);
//# sourceMappingURL=products.service.js.map