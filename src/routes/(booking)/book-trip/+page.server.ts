import type { TokensType } from '$lib/types/transaction'
import { checkDateIs18YearsOlderThanToday } from '$lib/utils/helper'
import {
	passengerFormRequiredFields,
	passengerIdFormRequiredFields,
	passengerPassportFormRequiredFields,
} from '$lib/utils/options'
import { valdiateCardDetails } from '$lib/validators/booking.validation'
import { fail } from '@sveltejs/kit'
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
	// there must be a better way to do this pass data to this action fucking hack for rushing for demo
	addPassenger: async ({ request, fetch }) => {
		const data = await request.formData()
		console.log('Data', data)

		const journey = JSON.parse(data.get('journey') as string)
		const tokens = JSON.parse(data.get('tokens') as string)

		const idType = data.get('idType')

		const formReqiuiredFields = [
			...passengerFormRequiredFields,
			...(idType === 'passport'
				? passengerPassportFormRequiredFields
				: passengerIdFormRequiredFields),
		]

		// Fail wouldnt fire here so hack for demo
		let error = false
		const missingFields: Record<string, boolean> = {}
		formReqiuiredFields.forEach((field) => {
			if (!data.get(field)) {
				missingFields[field as keyof typeof missingFields] = true
				error = true
			}
		})

		if (error) {
			return fail(403, {
				...missingFields,
				error: 'Missing required fields',
			})
		} else {
			// Fetch input values from the form
			const firstname = data.get('firstname')
			const lastname = data.get('lastname')
			const gender = data.get('gender')
			const mobile = data.get('mobile')
			const birthday = data.get('birthday') as string
			const ssr = data.get('ssr')
			const testtt = data.get('testtt')
			const emailaddress = data.get('emailaddress')
			const passenger_type_id = data.get('passenger_type_id')
			const passenger_id = data.get('passenger_id')

			// Check if the passenger is 18 years old or older
			if (passenger_type_id === '1') {
				const isOldEnough = checkDateIs18YearsOlderThanToday(birthday)
				if (!isOldEnough) {
					return fail(403, {
						birthday: true,
						incorrect: true,
						error: 'Date of birth wrong',
						current: birthday,
					})
				}
			}

			const transactionPayload = generateTransaction(
				tokens,
				journey,
				{
					firstname,
					lastname,
					birthday,
					mobile,
					gender,
					ssr,
					email: emailaddress,
				},
				passenger_id
			)

			console.log('Transaction', transactionPayload)

			const req = await fetch('/api/journey/transaction', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(transactionPayload),
			})

			const { status, data: transaction } = await req.json()
			console.log('Transaction', transaction)

			// If all is good, return the data
			return {
				success: true,
				transaction: transaction.transaction,
			}
		}
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

		console.log('NUMBER": ', number)

		const response = await fetch('/api/journey/payment', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				card: {
					name: name,
					number: number.replace(/ /g, ''),
					expireDate: expireDate,
					cvc: cvc,
				},
				channel: 'Desktop',
				source: 1,
				token: token,
			}),
		})
		const resp = await response.json()

		if (resp.status !== 'success') {
			return fail(400, { error: 'internal Server Error', resp })
		}

		return {
			success: true,
		}
	},
}

function generateTransaction(
	tokens: TokensType,
	journey,
	passenger,
	id: number
) {
	// assign passenger to the outbound journey
	journey.outbound.passengers[id] = {
		...journey.outbound.passengers[id],
		...passenger,
	}
	if (journey.inbound.date !== null) {
		journey.inbound.passengers[id] = {
			...journey.inbound.passengers[id],
			...passenger,
		}
	}
	return {
		token: tokens.token,
		products_token: tokens.products_token,
		channel: 'Desktop',
		outbound: {
			...journey.outbound,
			passengers: journey.outbound.passengers,
		},
		inbound: journey.inbound.date
			? {
					...journey.inbound,
					passengers: journey.inbound.passengers,
			  }
			: undefined,
	}
}
