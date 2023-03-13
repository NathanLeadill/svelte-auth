import { jsonResponse } from '$lib/helpers'
import jwt from 'jsonwebtoken'

export async function POST({ request }) {
	const { email, password } = await request.json()
	const token = await signIn(email, password)
	if (!token) {
		return jsonResponse({ message: 'Invalid username or password' }, 401)
	}
	return jsonResponse({ token }, 200)
}

async function signIn(email: string, password: string) {
	const data = await fetch('https://tardis.junction.dev/mtr/accounts/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email,
			password,
		}),
	})
	const user = await data.json()

	if (!user || user.status == 'fail') {
		return false
	}
	return jwt.sign({ ...user.data.account }, 'SECRET', {
		expiresIn: '7d',
	})
}
