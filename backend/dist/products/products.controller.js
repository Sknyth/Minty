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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsController = void 0;
const common_1 = require("@nestjs/common");
const products_service_1 = require("./products.service");
const product_dto_1 = require("./product.dto");
const public_decorator_1 = require("../auth/public.decorator");
const cloudinary_service_1 = require("../cloudinary/cloudinary.service");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
let ProductsController = class ProductsController {
    productService;
    cloudinaryService;
    constructor(productService, cloudinaryService) {
        this.productService = productService;
        this.cloudinaryService = cloudinaryService;
    }
    searchProducts(query) {
        return this.productService.searchProducts(query);
    }
    fetchProducts() {
        return this.productService.fetchProducts();
    }
    async createProduct(productData, file) {
        const image_url = file ? await this.cloudinaryService.uploadImage(file) : productData.image_url;
        const sizes = Array.isArray(productData.sizes) ? productData.sizes : JSON.parse(String(productData.sizes));
        return this.productService.createProduct({
            ...productData,
            price: Number(productData.price),
            sizes,
            image_url
        });
    }
    async updateProduct(productData, id, file) {
        const image_url = file ? await this.cloudinaryService.uploadImage(file) : productData.image_url;
        const sizes = Array.isArray(productData.sizes) ? productData.sizes : JSON.parse(String(productData.sizes));
        return this.productService.updateProduct(id, {
            ...productData, price: Number(productData.price),
            sizes,
            image_url
        });
    }
    deleteProducts() {
        return this.productService.deleteProducts();
    }
    deleteProductById(id) {
        return this.productService.deleteProductById(id);
    }
    sortProducts(criteria) {
        return this.productService.sortProducts(criteria);
    }
};
exports.ProductsController = ProductsController;
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('search'),
    __param(0, (0, common_1.Query)('query')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "searchProducts", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "fetchProducts", null);
__decorate([
    (0, common_1.Post)('create'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', { storage: (0, multer_1.memoryStorage)() })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_dto_1.CreateProductDto, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "createProduct", null);
__decorate([
    (0, common_1.Patch)('update/:id'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', { storage: (0, multer_1.memoryStorage)() })),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(2, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Number, Object]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "updateProduct", null);
__decorate([
    (0, common_1.Delete)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ProductsController.prototype, "deleteProducts", null);
__decorate([
    (0, common_1.Delete)('delete/:id'),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "deleteProductById", null);
__decorate([
    (0, public_decorator_1.Public)(),
    (0, common_1.Get)('sort'),
    __param(0, (0, common_1.Query)('criteria')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductsController.prototype, "sortProducts", null);
exports.ProductsController = ProductsController = __decorate([
    (0, common_1.Controller)(),
    __metadata("design:paramtypes", [products_service_1.ProductsService,
        cloudinary_service_1.CloudinaryService])
], ProductsController);
//# sourceMappingURL=products.controller.js.map