import type { ScheduleType } from '$lib/types/schedules'
import { writable } from 'svelte/store'

export type BookTripState = {
	train_id: number
	ticketTypeId: number
	schedule_id: number
	outbound?: ScheduleType
	inbound?: ScheduleType
	vehicles: { inbound: Vehicle; outbound: Vehicle }
	token?: string
	products_token?: string
	state?: any
}

// Create writable store
export const bookTrip = writable<BookTripState>({
	train_id: 0,
	ticketTypeId: 0,
	schedule_id: 0,
	outbound: undefined,
	inbound: undefined,
	vehicles: {
		inbound: { make: '', model: '', registration: '', id: 0, quantity: 1 },
		outbound: { make: '', model: '', registration: '', id: 0, quantity: 1 },
	},
	state: {},
})

export type BookingStateType = {
	journey?: {
		outbound: ScheduleType
		inbound: ScheduleType
	}
	tokens: {
		token: string
		products_token: string
	}
	price: {
		amount: number
		vat: number
		tax: number
	}
}

export const bookingState = writable<BookingStateType>({
	tokens: {
		token: '',
		products_token: '',
	},
	price: {
		amount: 0,
		vat: 0,
		tax: 0,
	},
})
