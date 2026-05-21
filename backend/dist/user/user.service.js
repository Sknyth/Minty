"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const bcrypt = __importStar(require("bcrypt"));
const prisma_service_1 = require("../prisma/prisma.service");
let UserService = class UserService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createUser(data) {
        const hashed = await bcrypt.hash(data.password, 10);
        const { password: _password, ...user } = await this.prisma.user.create({
            data: { ...data, password: hashed, role: client_1.Role.user },
        });
        return user;
    }
    async getUserByEmail(email) {
        return this.prisma.user.findUnique({ where: { email } });
    }
    async getUserById(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user)
            return null;
        const { password: _password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
    async getAllUsers() {
        return this.prisma.user.findMany();
    }
    async updateRefreshToken(userId, hashedRefreshToken) {
        return this.prisma.user.update({
            where: {
                id: userId,
            },
            data: {
                hashedRefreshToken,
            },
        });
    }
    async updateUser(userId, name, surname, phone) {
        return this.prisma.user.update({
            where: {
                id: userId
            },
            data: { name, surname, phone }
        });
    }
    async selectPayment(userId, selectedPaymentId) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { selectedPaymentId: { set: selectedPaymentId } }
        });
    }
    async selectAddress(userId, selectedAddressId) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { selectedAddressId: { set: selectedAddressId } }
        });
    }
    async updateRole(userId, newRole) {
        return this.prisma.user.update({
            where: { id: userId },
            data: { role: newRole }
        });
    }
    async deleteUser(userId) {
        return this.prisma.user.delete({
            where: { id: userId }
        });
    }
    async searchUsers(query) {
        const id = parseInt(query);
        const validRole = ['user', 'admin'];
        const matchRole = validRole.includes(query) ? query : undefined;
        return this.prisma.user.findMany({
            where: {
                OR: [
                    ...(isNaN(id) ? [] : [{ id }]),
                    { name: { contains: query, mode: 'insensitive' } },
                    { surname: { contains: query, mode: 'insensitive' } },
                    { email: { contains: query, mode: 'insensitive' } },
                    ...(matchRole ? [{ role: matchRole }] : [])
                ]
            }
        });
    }
    async changePass(userId, oldPass, newPass) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new common_1.BadRequestException('User not found');
        const isValid = await bcrypt.compare(oldPass, user.password);
        if (!isValid)
            throw new common_1.BadRequestException('Old password is incorrect');
        if (oldPass === newPass)
            throw new common_1.BadRequestException('The new password must be different from the old password');
        const hashedPassword = await bcrypt.hash(newPass, 10);
        return this.prisma.user.update({
            where: { id: userId },
            data: {
                password: hashedPassword
            }
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map