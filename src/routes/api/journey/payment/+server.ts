import { jsonResponse } from '$lib/utils/helper'

export async function POST({ request }: { request: Request }) {
	const body = await request.json()

	const inputData = {
		...body,
		card: {
			...body.card,
			expireMonth: '10',
			expireYear: '2025',
		},
		channel: 'Desktop',
		source: 1,
		directions: ['inbound', 'outbound'],
		inbound_matrix_batch_id: null,
		outbound_matrix_batch_id: null,
		locale: 'en-us',
		loyaltyNumbers: {},
	}

	const responseFromApi = await fetch(
		'https://api.spex.snowfalltravel.com/mtr/payment',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(inputData),
		}
	)

	const data = await responseFromApi.json()

	return jsonResponse(data, 200)
}
