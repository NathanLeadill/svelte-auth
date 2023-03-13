import { jsonResponse } from '$lib/helpers'

export async function POST({ request }) {
	const body = await request.json()
	const { email } = body
	const response = await fetch(
		'https://tardis.junction.dev/mtr/accounts/forgotpassword',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				email,
			}),
		}
	)
	const { status } = await response.json()

	return jsonResponse(status, 200)
}
