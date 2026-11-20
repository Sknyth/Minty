import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AddressModule } from './address/address.module'
import { AuthModule } from './auth/auth.module'
import { CartModule } from './cart/cart.module'
import { OrderModule } from './order/order.module'
import { PaymentModule } from './payment/payment.module'
import { ProductsModule } from './products/products.module'
import { UserModule } from './user/user.module'
import { WishlistModule } from './wishlist/wishlist.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AddressModule,
    AuthModule,
    CartModule,
    OrderModule,
    PaymentModule,
    ProductsModule,
    UserModule,
    WishlistModule,
  ],
})
export class AppModule {}
