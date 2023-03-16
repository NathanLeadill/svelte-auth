import { fail } from '@sveltejs/kit'
import Swal from 'sweetalert2'
import type { Actions } from './$types'

export const actions: Actions = {
	default: async ({ request, cookies, fetch }) => {
		const formData = await request.formData()
		const email = formData.get('email')

		if (email) {
			const req = await fetch('/api/auth/forgot-password', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					email,
				}),
			})

			const { status } = await req.json()
			console.log('Status', status)

			if (status === 'success') {
				const { isConfirmed } = await Swal.fire({
					title: 'Success!',
					text: 'Please check your email for a password reset link.',
					icon: 'success',
				})

				if (isConfirmed) {
					return true
				}
			}
		}
		return fail(400, { error: 'Invalid login or password' })
	},
}
