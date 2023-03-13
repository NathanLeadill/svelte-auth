import { error, fail, redirect } from '@sveltejs/kit'
import jwt from 'jsonwebtoken'
import type { Action, Actions, PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ locals }) => {
	// redirect user if logged in
	if (locals.user) {
		throw redirect(302, '/')
	}
}

const signin: Action = async ({ cookies, request, fetch }) => {
	const data = await request.formData()
	const email = data.get('email')
	const password = data.get('password')

	console.log('DATA', email, password)

	if (!email || typeof email !== 'string') {
		return fail(400, { email, incorrect: true, error: 'Invalid email' })
	}

	if (
		typeof email !== 'string' ||
		typeof password !== 'string' ||
		!email ||
		!password
	) {
		// return invalidate(400, { invalid: true })
		return fail(403, {
			email,
			incorrect: true,
			error: 'Missing email or password',
		})
	}

	const req = await fetch('/api/login', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email,
			password,
		}),
	})

	const body = await req.json()
	if (!body.token) {
		// throw error(401, 'Login could not be performed')
		return fail(403, { email, incorrect: true })
	}

	const user = jwt.verify(body.token, 'SECRET')
	if (!user) {
		throw error(400, { invalid: true, error: 'Couldnt login' })
	}
	cookies.set('session', body.token, {
		// send cookie for every page
		path: '/',
		// server side only cookie so you can't use `document.cookie`
		httpOnly: true,
		// only requests from same site can send cookies
		// https://developer.mozilla.org/en-US/docs/Glossary/CSRF
		sameSite: 'strict',
		// only sent over HTTPS in production
		secure: process.env.NODE_ENV === 'production',
		// set cookie to expire after a month
		maxAge: 60 * 60 * 24 * 30,
	})

	// redirect the user
	throw redirect(302, '/')
}

export const actions: Actions = { signin }
