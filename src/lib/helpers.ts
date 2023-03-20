import type { RequestEvent } from '@sveltejs/kit'
import type { PassengerDetailsType } from './types/account'
import type { SearchData } from './types/destination'
import type { ScheduleType } from './types/schedules'
import type { VehicleType } from './types/transaction'
import { getJourneyWithActiveRoute } from './utils/helper'

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

export function generateTransactionData(
	searchData: SearchData,
	selectedTrip: {
		outbound: ScheduleType[]
		inbound: ScheduleType[]
	},
	tokens,
	passengers: {
		outbound: PassengerDetailsType[]
		inbound: PassengerDetailsType[]
	},
	options,
	vehicles: {
		outbound: VehicleType
		inbound: VehicleType
	}
) {
	console.log('searchData', searchData, 'selectedTrip', selectedTrip)

	return {
		directions: searchData.directions,
		channel: 'Desktop',
		token: tokens.token,
		products_token: tokens.products_token,
		amount: 10, // fix
		net: 10, // fix
		outbound: getJourneyWithActiveRoute(
			selectedTrip.outbound[0],
			passengers.outbound,
			vehicles.outbound,
			options.outbound
		),
		...(selectedTrip.outbound && searchData.directions.includes('inbound')
			? {
					inbound: getJourneyWithActiveRoute(
						selectedTrip.inbound[0],
						passengers.inbound,
						vehicles.inbound,
						options.inbound
					),
			  }
			: {}),
	}
}
