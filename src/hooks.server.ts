import type { Handle } from '@sveltejs/kit'
import jwt from 'jsonwebtoken'

export const handle: Handle = async ({ event, resolve }) => {
	// get cookies from browser
	const session = event.cookies.get('session')

	if (!session) {
		// if there is no session load page as normal
		return await resolve(event)
	}

	// find the user based on the session
	// const user = db.user.find((user) => user.token === session)
	const user = jwt.verify(session, 'SECRET')

	// if `user` exists set `events.local`
	if (user) {
		event.locals.user = user
	}

	// load page as normal
	return await resolve(event)
}
