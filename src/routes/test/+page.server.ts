import { fail } from '@sveltejs/kit'

import { valdiateCardDetails } from '$lib/validators/booking.validation'
import jwt from 'jsonwebtoken'
import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ url }) => {
	const token = url.searchParams.get('token')
	if (token) {
		const params = jwt.verify(token, 'SECRET')
		return {
			params,
		}
	}

	return {
		data: 'test',
	}
}

// ACTIONS
export const actions = {
	addProductAndVehicles: async ({ request, fetch }) => {
		const data = await request.formData()
		const selected = JSON.parse(data.get('selected'))
		console.log('selected', selected)

		const req = await fetch('/api/journey/transaction', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(transactionPayload),
		})

		const resp = await req.json()
		console.log('RESP', resp)

		// const test = generateTransactionData(
		// 	selected.outbound,
		// 	selected.journey.outbound,
		// 	selected.tokens,
		// 	selected.journey.outbound.transaction.outbound.passengers,
		// 	'outbound'
		// )
		return true
	},

	runPayment: async ({ request, fetch }) => {
		const data = await request.formData()
		const token = data.get('token')
		const promocode = data.get('promo-code')
		const name = data.get('name') as string
		const number = data.get('card-number') as string
		const expireDate: Date = new Date(data.get('expire-date') as string)
		const cvc = data.get('cvc') as string

		const [isValid, formErrors] = valdiateCardDetails({
			name,
			number,
			expireDate,
			cvc,
		})

		if (!isValid) {
			return fail(400, { error: 'Invalid fields', ...formErrors[0] })
		}

		const response = await fetch('/api/payment', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				card: {
					name: name,
					number: number,
					expireDate: expireDate,
					cvc: cvc,
				},
				channel: 'Desktop',
				source: 1,
				token: token,
			}),
		})
		const { status, data: resp } = await response.json()
		if (status === 'error') {
			return fail(400, { error: 'internal Server Error', resp })
		}

		console.log('isValid', isValid, 'FormErrors', formErrors)

		return {
			success: true,
			promocode,
			name,
			number,
			expireDate,
			cvc,
		}
	},
}

/**
 *
 */
