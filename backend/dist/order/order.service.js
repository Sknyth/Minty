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
exports.OrderService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("src/prisma/prisma.service");
let OrderService = class OrderService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async fetchOrders(userId) {
        return this.prisma.order.findMany({
            where: { userId },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });
    }
    async fetchAllOrders() {
        return this.prisma.order.findMany({
            include: {
                items: {
                    include: {
                        product: true
                    }
                },
                user: true
            }
        });
    }
    async createOrder(userId, data) {
        const { items, ...orderData } = data;
        return this.prisma.order.create({
            data: {
                ...orderData,
                userId,
                items: {
                    create: items.map(item => ({
                        productId: item.productId,
                        quantity: item.quantity,
                        size: item.size,
                        price: item.product.price,
                    }))
                }
            }
        });
    }
    async updateOrderStatus(orderId, newStatus) {
        return this.prisma.order.update({
            where: { id: orderId },
            data: { status: newStatus }
        });
    }
    async searchOrders(query) {
        const id = parseInt(query);
        const validStatuses = ['pending', 'delivered', 'cancelled'];
        const statusMatch = validStatuses.includes(query) ? query : undefined;
        return this.prisma.order.findMany({
            where: {
                OR: [
                    ...(isNaN(id) ? [] : [{ id }]),
                    { customerName: { contains: query, mode: 'insensitive' } },
                    { customerSurname: { contains: query, mode: 'insensitive' } },
                    { customerEmail: { contains: query, mode: 'insensitive' } },
                    ...(statusMatch ? [{ status: statusMatch }] : []),
                ]
            },
            include: {
                items: true,
                user: true,
            }
        });
    }
};
exports.OrderService = OrderService;
exports.OrderService = OrderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrderService);
//# sourceMappingURL=order.service.js.map