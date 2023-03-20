import type { PassengerDetailsType } from '$lib/types/account'
import {
	locationIds,
	locationLabels,
	type JourneyType,
	type PassengerOptions,
} from '$lib/types/destination'
import type { ScheduleType, TicketProduct } from '$lib/types/schedules'
import type { RequestEvent } from '@sveltejs/kit'
// import type { BookTripState, Vehicle } from './stores'

export const passengerIds = {
	adults: 1,
	children: 4,
}

export function jsonResponse<T>(data: T, status = 200): Response {
	return new Response(JSON.stringify(data), {
		headers: { 'Content-Type': 'application/json' },
		status,
	})
}

export async function jsonRequest<T>(request: RequestEvent): Promise<T> {
	try {
		return await request.request.json()
	} catch {
		throw 'Invalid JSON body'
	}
}

export function getTheOtherLocation(location: string) {
	return location == 'malta' ? locationIds['ragusa'] : locationIds['malta']
}

// Move to utils in later PR wont work without 2 separate ones for now...
export function getLocationById(value: number) {
	return Object.keys(locationIds).find(
		(key) => locationIds[key as keyof typeof locationIds] === value
	)
}

export function getLocationLabelById(id: number) {
	return locationLabels[id as keyof typeof locationLabels]
}

export function sumValues(obj: Record<string, number>): number {
	return Number(Object.values(obj).reduce((a, b) => a + b, 0))
}

export function filterObjectByKey(obj: Record<string, any>, filterKey: string) {
	return Object.keys(obj)
		.filter((key) => key.indexOf(filterKey) === -1)
		.reduce((acc, key) => ({ ...acc, [key]: obj[key] }), {})
}

export const groupBy = function (xs, key) {
	return xs.reduce(function (rv, x) {
		;(rv[x[key]] = rv[x[key]] || []).push(x)
		return rv
	}, {})
}

export function generateRoute(
	type = 'outbound',
	journey: JourneyType,
	bookTripState: BookTripState
) {
	const route = journey[type as keyof typeof journey]
	const routeString = bookTripState[type as keyof typeof bookTripState]
	// tjhrow error
	if (typeof routeString !== 'string') return
	const [product_id, ferryId, schedule_id] = routeString.split('.')

	const activeRoute = route.find(
		(ferry: ScheduleType) =>
			ferry.schedule_id === Number(schedule_id) &&
			ferry.train_id === Number(ferryId)
	)

	if (activeRoute.products.length > 0) {
		const activeTicket = activeRoute.products.find(
			(product: TicketProduct) => product.id === Number(product_id)
		)
		const {
			departure_time,
			arrival_time,
			departure_date,
			arrival_date,
			origin_id,
			destination_id,
			travel_date,
		} = activeRoute

		return {
			...activeTicket,
			departure_time,
			arrival_time,
			departure_date,
			arrival_date,
			origin_id,
			destination_id,
			travel_date,
		}
	}
}

export function calculateTotalsForPassengerTypes(
	type = 'outbound',
	journey: JourneyType,
	bookTripState: BookTripState
) {
	const price = 0
	const uniqueTickets = generateRoute(type, journey, bookTripState)

	return uniqueTickets.unit_prices.map((el) => ({
		id: el.passenger_type_id,
		price: el.price,
	}))
}

export function calculateJourneyTotalPrice(
	type = 'outbound',
	journey: JourneyType,
	bookTripState: BookTripState
) {
	return calculateTotalsForPassengerTypes(type, journey, bookTripState).reduce(
		(acc: number, curr: TicketProduct) => {
			return acc + curr.price
		},
		0
	)
}

export function calculateTotalForAllRoutes(
	journey: JourneyType,
	bookTripState: BookTripState
) {
	const oTotal = calculateJourneyTotalPrice('outbound', journey, bookTripState)
	if (journey.inbound.length > 0) {
		const iTotal = calculateJourneyTotalPrice('inbound', journey, bookTripState)
		return oTotal + iTotal
	}
	return oTotal
}

export function createCookie(name: string, value: any, days: number): void {
	let expires
	if (days) {
		const date = new Date()
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
		expires = '; expires=' + date.toString()
	} else {
		expires = ''
	}
	document.cookie = name + '=' + value + expires + '; path=/'
}

export function eraseCookie(name: string): void {
	createCookie(name, '', -1)
}

export function getJourneyWithActiveRoute(
	selectedJourney: ScheduleType,
	passengers: PassengerDetailsType[],
	vehicles: Vehicle,
	options
) {
	return {
		date: selectedJourney.travel_date,
		destination_id: selectedJourney.destination_id,
		origin_id: selectedJourney.origin_id,
		schedule_id: selectedJourney.schedule_id,
		product_id: options.product_id,
		matrix_batch_id: 0,
		passengers: passengers,
		vehicles:
			options.vehicle && options.vehicle.id !== 0 ? [options.vehicle] : [],
	}
}

export function getJourney(
	trip: ScheduleType,
	journey: ScheduleType[],
	passengers: PassengerDetailsType[],
	vehicles: Vehicle
) {
	const {
		train_id,
		schedule_id,
		products: [{ id: product_id }],
	} = trip

	const selectedJourney = journey.find(
		(el) => el.train_id === train_id && el.schedule_id == schedule_id
	)
	if (selectedJourney) {
		return {
			date: selectedJourney.travel_date,
			destination_id: selectedJourney.destination_id,
			origin_id: selectedJourney.origin_id,
			schedule_id: selectedJourney.schedule_id,
			product_id,
			matrix_batch_id: 0,
			passengers,
			vehicles: vehicles.id !== 0 ? [vehicles] : [],
		}
	}
}

export function getTotalPriceForProduct(
	directions: string[],
	trip: BookTripState,
	journey: JourneyType
) {
	// @TODO WTF
	let price = 0
	if (trip.outbound) {
		if (journey.outbound) {
			price += trip.outbound.products[0].price
			if (
				trip.state.outbound &&
				trip.state.outbound.vehicle_places.length > 0
			) {
				price += Number(trip.state.outbound.vehicle_places[0].price)
			}
		}
	}

	if (directions.includes('inbound') && trip.inbound) {
		price += trip.inbound.products[0].price
		if (trip.state.inbound.vehicle_places.length > 0) {
			price += Number(trip.state.inbound.vehicle_places[0].price)
		}
	}

	console.log('Trip', trip)

	return price
}

export function generatePassengers(passengerObject: PassengerOptions) {
	const entries = Object.entries(passengerObject)

	const generatedPassengers = entries
		.map(([key, value]) => {
			const passengerId = passengerIds[key as keyof typeof passengerIds]
			if (value > 0) {
				return Array(value)
					.fill(passengerId)
					.map((el) => ({
						passenger_type_id: el,
					}))
			}
		})
		.flat()

	return generatedPassengers.filter((el) => el)
}

export function getDateTimeWithoutTimezone(date: string) {
	const pDate = new Date(date)
	const offset = pDate.getTimezoneOffset()
	const newDate = new Date(pDate.getTime() + offset * 60000)

	return newDate
}

export async function formatPrice(price: number, currency: string) {
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency,
	})

	return formatter.format(price)
}

export async function addUpPricesFromArrayAndFormat(
	prices: number[],
	currency: string
) {
	const total = prices.reduce((acc, curr) => acc + curr, 0)
	return formatPrice(total, currency)
}

export async function runLogout(token: string) {
	const response = await fetch('/api/auth/signout', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			token,
		}),
	})
	return await response.json()
}

export function checkDateIs18YearsOlderThanToday(date: string) {
	const today = new Date()
	const eighteenYearsAgo = new Date(
		today.getFullYear() - 18,
		today.getMonth(),
		today.getDate()
	)
	const dateOfBirth = new Date(date)
	return eighteenYearsAgo > dateOfBirth
}

function timeStringToFloat(time: string) {
	const hoursMinutes = time.split(/[.:]/)
	const hours = parseInt(hoursMinutes[0], 10)
	const minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0
	return hours + minutes / 60
}

function convertFloatToTimeString(time: number) {
	const hours = Math.floor(time)
	const minutes = Math.floor((time - hours) * 60)
	return hours + ':' + minutes
}

export function calculateJourneyDuration(
	arrival_time: string,
	departure_time: string,
	format = false
) {
	const outboundDuration = timeStringToFloat(arrival_time)
	const inboundDuration = timeStringToFloat(departure_time)
	const duration = convertFloatToTimeString(
		Number(outboundDuration - inboundDuration)
	)
	if (format) {
		return duration.replace(':', 'h ') + ' m'
	}
	return duration
}
