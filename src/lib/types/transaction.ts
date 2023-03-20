export type Transaction = {
	id: number
	external_id: string
	external_reference: string
	stripe_token: string
	stripe_email: string
	stripe_charge: string
	token: string
	channel: string
	transaction_status_id: number
	invoiced: boolean
	psp_id: number
	products_token: string
	payment_type_id: number
	affiliate_id: number
	account_id: number
	booking_id: number
	booking_reference: string
	agreement_id: number
	reference: string
	amount: number
	net: number
	vat: number
	tax: number
	refund: boolean
	payment_pending: boolean
	payed_date: number
	created: number
	modified: number
}

export type PaymentDetailsType = {
	name: string
	number: string
	expireDate: Date
	cvc: string
	promo?: string
}

export type TokensType = {
	token: string
	products_token: string
}

export type VehicleType = {
	id: number
	make: string
	model: string
	registration: string
	quantity?: number
}
