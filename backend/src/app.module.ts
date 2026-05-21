import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service'
import { CartModule } from './cart/cart.module';
import { PaymentModule } from './payment/payment.module';
import { AddressModule } from './address/address.module';
import { OrderModule } from './order/order.module';
import { WishlistModule } from './wishlist/wishlist.module';
import { AuthGuard } from './auth/auth.guard'
import { APP_GUARD } from '@nestjs/core/constants'
import { CloudinaryService } from './cloudinary/cloudinary.service';



@Module({
  imports: [ProductsModule, PrismaModule, ConfigModule.forRoot({ isGlobal: true }), UserModule, AuthModule, CartModule, PaymentModule, AddressModule, OrderModule, WishlistModule],
  controllers: [AppController, UserController, AuthController],
  providers: [AppService, UserService, AuthService, { provide: APP_GUARD, useClass: AuthGuard }, CloudinaryService,],
  
})
export class AppModule {}