import type { ScheduleType } from '$lib/types/schedules'
import { writable } from 'svelte/store'

export type BookTripState = {
	trainId: number
	ticketTypeId: number
	scheduleId: number
	outbound?: ScheduleType
	inbound?: ScheduleType
	vehicles: { inbound: Vehicle; outbound: Vehicle }
	token?: string
	products_token?: string
	state?: any
}

// Create writable store
export const bookTrip = writable<BookTripState>({
	trainId: 0,
	ticketTypeId: 0,
	scheduleId: 0,
	outbound: undefined,
	inbound: undefined,
	vehicles: {
		inbound: { make: '', model: '', registration: '', id: 0, quantity: 1 },
		outbound: { make: '', model: '', registration: '', id: 0, quantity: 1 },
	},
	state: {},
})

export const bookingState = writable({
	token: '',
	product_token: '',
})
