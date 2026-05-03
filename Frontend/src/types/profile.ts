export interface Profile {
  id: string
  name: string
  surname: string
  email: string
  phone: string
  role: string
  selected_address_id: string | null
  selected_payment_id: string | null
  created_at: string
}

export type ProfileInput = Omit<Profile, 'id' | 'role' | 'created_at'>