import { error, redirect } from '@sveltejs/kit'

import type { Action, Actions, PageServerLoad } from './$types'

import { db } from '$lib/database'

import jwt from 'jsonwebtoken'

export const load: PageServerLoad = async ({ locals }) => {
	// redirect user if logged in
	if (locals.user) {
		throw redirect(302, '/')
	}
}

const login: Action = async ({ cookies, request }) => {
	const data = await request.formData()
	const username = data.get('username')
	const password = data.get('password')

	if (
		typeof username !== 'string' ||
		typeof password !== 'string' ||
		!username ||
		!password
	) {
		// return invalidate(400, { invalid: true })
		throw error(400, { invalid: true })
	}

	// const user = await db.user.findUnique({ where: { username } })
	const user = db.user.find((user) => user.username === username)

	if (!user) {
		throw error(400, { invalid: true })
	}

	// compare password
	if (user.password !== password) {
		throw error(400, { invalid: true })
	}

	// const userPassword = await bcrypt.compare(password, user.passwordHash)

	// if (!userPassword) {
	// 	throw error(400, { invalid: true })
	// }
	// generate new jwt token

	const newToken = jwt.sign(
		{
			id: user.id,
			username: user.username,
			role: user.name,
		},
		'SECRET',
		{
			expiresIn: '1d',
		}
	)

	user.token = newToken

	cookies.set('session', newToken, {
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

export const actions: Actions = { login }
