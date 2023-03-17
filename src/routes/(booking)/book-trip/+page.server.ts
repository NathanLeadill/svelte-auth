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

	addPassenger: async ({ request, fetch }) => {
		const data = await request.formData()
		console.log('TEST', data)

		const firstname = data.get('firstname')
		const lastname = data.get('lastname')
		const age = data.get('age')
		const gender = data.get('gender')
		const mobile = data.get('mobile')
		const dob = data.get('dob')
		const idType = data.get('idType')
		const ssr = data.get('ssr')
		const testtt = data.get('testtt')
		const emailaddress = data.get('emailaddress')

		return {
			success: true,
			age,
			gender,
			mobile,
			firstname,
			lastname,
			dob,
			ssr,
			idType,
			testtt,
			emailaddress,
		}
	},
}

/**
 *
 */
