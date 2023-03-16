import { locationIds } from '$lib/types/destination'
import { getTheOtherLocation, jsonResponse } from '$lib/utils/helper'

export async function POST({ request }: { request: Request }) {
	const body = await request.json()

	const {
		directions,
		origin,
		outboundDate,
		inboundDate,
		passengers,
	}: {
		directions: string[]
		origin: string
		outboundDate: Date
		inboundDate: Date
		passengers: Array<{ passenger_type_id: number }>
	} = body

	// @TODO move this
	const searchPayload = {
		directions,
		channel: 'Desktop',
		...(directions?.includes('outbound') && {
			outbound: {
				date: new Date(outboundDate).toISOString().split('T')[0],
				destination_id: getTheOtherLocation(origin),
				origin_id: locationIds[origin as keyof typeof locationIds],
				passengers,
			},
		}),
		...(directions?.includes('inbound') && {
			inbound: {
				date: new Date(inboundDate).toISOString().split('T')[0],
				destination_id: locationIds[origin as keyof typeof locationIds],
				origin_id: getTheOtherLocation(origin),
				passengers,
			},
		}),
		amount: 0,
		net: 0,
		locale: 'en-us',
	}

	const {
		status,
		data: { transaction },
	} = await fetch('https://api.spex.snowfalltravel.com/mtr/transaction', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(searchPayload),
	}).then((res) => res.clone().json())

	const response = await fetch(
		'https://api.spex.snowfalltravel.com/mtr/products',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				...searchPayload,
				token: transaction.token,
			}),
		}
	)

	const { data: schedule } = await response.json()

	return jsonResponse(
		{
			transaction,
			status,
			schedule: schedule.schedules,
		},
		200
	)
}

type PassengerTypes = {
	passenger_type_id: number
}

async function buildPassengerObject(passengerTypes: PassengerTypes[]) {
	const response = await fetch(
		'https://api.spex.snowfalltravel.com/mtr/transaction',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(passengerTypes),
		}
	)
	const responseObj = await response.json()
	return {
		passengers: responseObj.outbound.passengers,
	}
}
