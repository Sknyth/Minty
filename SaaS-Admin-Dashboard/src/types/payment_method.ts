export interface PaymentMethod {
	id: string
	user_id: string
	number: number
	expiration_date: string
	holder_name: string
	cvv: number
	type: 'MasterCard' | 'Visa' | 'Mir' | 'Maestro' | 'Unknown'
}

export type PaymentMethodInput = Omit<PaymentMethod, 'id' | 'user_id'>