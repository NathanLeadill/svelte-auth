// +page.server.ts
import { invalid, redirect } from '@sveltejs/kit'
import type { Actions } from './$types'

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = await request.formData()
		const login = formData.get('login')
		const password = formData.get('password')

		if (login == 'admin' && password == '...') {
			cookies.set('auth', '42', {
				path: '/',
				maxAge: 60 * 60 * 24 * 365,
				httpOnly: false, // <-- if you want to read it in the browser
			})
			throw redirect(302, '/')
		}
		return invalid(400, { error: 'Invalid login or password' })
	},
}
