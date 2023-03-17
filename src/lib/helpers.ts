import type { RequestEvent } from '@sveltejs/kit'
import type { SearchData } from './types/destination'
import type { ScheduleType } from './types/schedules'
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
	passengers: PassengerDetailsType[],
	options
) {
	console.log('PASSENGERS', passengers)

	return {
		directions: searchData.directions,
		channel: 'Desktop',
		token: tokens.token,
		products_token: tokens.products_token,
		amount: 10, // fix
		net: 10, // fix
		outbound: getJourneyWithActiveRoute(
			selectedTrip.outbound[0],
			passengers,
			searchData.outbound?.vehicles,
			options.outbound
		),
		...(selectedTrip.outbound && searchData.directions.includes('inbound')
			? {
					inbound: getJourneyWithActiveRoute(
						selectedTrip.inbound[0],
						passengers,
						searchData.inbound?.vehicles,
						options.inbound
					),
			  }
			: {}),
	}
}

/**
 * const transactionData = {
			directions: searchData.directions,
			channel: 'Desktop',
			token: passengerInfo.token,
			products_token: schedule.token,
			amount: price,
			net: price,
			...($bookTrip.outbound && searchData.directions.includes('outbound')
				? {
						outbound: getJourney(
							$bookTrip.outbound,
							journey.outbound,
							journey.transaction.outbound.passengers,
							$bookTrip.vehicles.outbound
						)
				  }
				: {}),
			...($bookTrip.inbound && journey.transaction.inbound
				? {
						inbound: getJourney(
							$bookTrip.inbound,
							journey.inbound,
							journey.transaction.inbound.passengers,
							$bookTrip.vehicles.inbound
						)
				  }
				: {})
		};
 */
