import { jsonResponse } from '$lib/utils/helper'

export async function POST({
	request,
	params: { token },
}: {
	request: Request
	params: {
		token: string
	}
}) {
	const response = await fetch(
		'https://api.spex.snowfalltravel.com/mtr/payment/verify',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				token,
			}),
		}
	)
	const data = await response.json()
	console.log('Data', data)

	return jsonResponse(
		data.data.payment.transaction.outbound.passengers[0].qrCode,
		200
	)
}
