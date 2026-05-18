export interface PaymentMethod {
	id: number
	user_id: string
	number: string
	expiration_date: string
	holder_name: string
	cvv: string
	type: 'MasterCard' | 'Visa' | 'Mir' | 'Maestro' | 'Unknown'
}

export type PaymentMethodInput = Omit<PaymentMethod, 'id' | 'user_id'>