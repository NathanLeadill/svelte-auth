import { jsonResponse } from '$lib/helpers'

export async function POST({ request }) {
	const body = await request.json()
	const response = await fetch(
		'https://api.spex.snowfalltravel.com/mtr/transaction',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		}
	)

	const data = await response.json()

	return jsonResponse(data, 200)
}
