import { jsonResponse } from '$lib/helpers'

export async function POST({ request }) {
	const body = await request.json()
	const { email } = body
	console.log('Email', email)

	const req = await fetch(
		'https://api.spex.snowfalltravel.com/mtr/accounts/forgotpassword',
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
	const resp = await req.json()
	console.log('Body', resp)

	return jsonResponse(resp, 200)
}
