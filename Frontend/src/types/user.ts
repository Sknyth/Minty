export interface User {
  id: number
  name: string
  surname: string
  email: string
  phone: string
  role: string
  selectedAddressId: number | null
  selectedPaymentId: number | null
  created_at: string
}

export type UserInput = Omit<User, 'id' | 'role' | 'created_at'>