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
	addProductAndVehicles: async ({ request }) => {
		const data = await request.formData()
		const selected = data.get('selected')
		console.log('selected', selected)

		console.log('Event: ', data)
		return true
	},
}
