import { OrderStatus } from '@prisma/client'

export class CreateOrderDto {
  customerName: string
  customerSurname: string
  customerEmail: string

  shippingStreet: string
  shippingCity: string
  shippingCountry: string
  shippingHouseNumber: string
  shippingApt: string
  shippingPostcode: string

  cardNumber: string
  cardHolderName: string
  cardCvv: string
  cardExpirationDate: string
  cardType: string

  total_price: number
  status: OrderStatus

  items: {
    productId: number
    quantity: number
    size: number
    product: { price: number }
  }[]
}