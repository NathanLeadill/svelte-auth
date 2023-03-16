import type { PassengerDetailsType } from './account'
import type { VehicleType } from './transaction'

export type TicketProduct = {
	id: number
	name: string
	description: string
	price: number
	tax: number
	vat: number
	vat_level: number
	real_price: number
	real_vat: number
	real_vat_level: number
	uses_voucher: boolean
	disable: boolean
	description_label: string
	unit_prices: {
		id: number
		price: number
		tax: number
		vat: number
		vat_level: number
		real_price: number
		real_vat: number
		real_vat_level: number
		uses_voucher: boolean
		disable: boolean
		description_label: string
	}[]
	addons: {
		id: number
		name: string
		description: string
		price: number
		tax: number
		vat: number
		vat_level: number
		real_price: number
		real_vat: number
		real_vat_level: number
		uses_voucher: boolean
		disable: boolean
		description_label: string
		unit_prices: {
			id: number
			price: number
			tax: number
			vat: number
			vat_level: number
			real_price: number
			real_vat: number
			real_vat_level: number
			uses_voucher: boolean
			disable: boolean
			description_label: string
		}[]
	}[]
}

export type TicketUnitSchedules = {
	passenger_type_id: number
	matrix_batch_id: number
	vat: number
	real_vat: number
	tax: number
	price: number
	real_price: number
}

export type ScheduleType = {
	arrival_time: string
	departure_time: string
	destination_id: number
	origin_id: number
	products: TicketProduct[]
	schedule_id: number
	travel_date: string
	seats_free: number
	train_id: number
}

export type ScheduleWithPassengers = ScheduleType & {
	passengers: PassengerDetailsType[]
}

// @TODO FIX TYPES
export type ScheduleReturnType = {
	outbound: any[]
	inbound: any[]
	token: string
}

export type ScheduleSelectedObject = {
	outbound: string
	inbound: string
}

export type ScheduleSelectedObj = {
	outbound: {
		train_id: number
		schedule_id: number
		product_id: number
		vehicle?: VehicleType
	}
	inbound: {
		train_id: number
		schedule_id: number
		product_id: number
		vehicle?: VehicleType
	}
}
