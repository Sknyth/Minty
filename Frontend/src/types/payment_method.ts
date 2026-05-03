export interface PaymentMethod {
	id: string
	user_id: string
	number: string
	expiration_date: string
	holder_name: string
	cvv: string
	type: 'MasterCard' | 'Visa' | 'Mir' | 'Maestro' | 'Unknown'
}