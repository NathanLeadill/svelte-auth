import { jsonResponse } from '$lib/helpers'
import jwt from 'jsonwebtoken'

export async function POST({ request, fetch }) {
	const { searchData } = await request.json()
	console.log('searchData', searchData)

	const token = jwt.sign(searchData, 'SECRET')

	return jsonResponse(token, 200)
}
