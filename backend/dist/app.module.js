"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const products_module_1 = require("./products/products.module");
const prisma_module_1 = require("./prisma/prisma.module");
const config_1 = require("@nestjs/config");
const user_controller_1 = require("./user/user.controller");
const user_service_1 = require("./user/user.service");
const user_module_1 = require("./user/user.module");
const auth_controller_1 = require("./auth/auth.controller");
const auth_module_1 = require("./auth/auth.module");
const auth_service_1 = require("./auth/auth.service");
const cart_module_1 = require("./cart/cart.module");
const payment_module_1 = require("./payment/payment.module");
const address_module_1 = require("./address/address.module");
const order_module_1 = require("./order/order.module");
const wishlist_module_1 = require("./wishlist/wishlist.module");
const auth_guard_1 = require("./auth/auth.guard");
const constants_1 = require("@nestjs/core/constants");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [products_module_1.ProductsModule, prisma_module_1.PrismaModule, config_1.ConfigModule.forRoot({ isGlobal: true }), user_module_1.UserModule, auth_module_1.AuthModule, cart_module_1.CartModule, payment_module_1.PaymentModule, address_module_1.AddressModule, order_module_1.OrderModule, wishlist_module_1.WishlistModule],
        controllers: [app_controller_1.AppController, user_controller_1.UserController, auth_controller_1.AuthController],
        providers: [app_service_1.AppService, user_service_1.UserService, auth_service_1.AuthService, { provide: constants_1.APP_GUARD, useClass: auth_guard_1.AuthGuard },],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map