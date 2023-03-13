import { redirect } from '@sveltejs/kit'
import type { PageServerLoadEvent } from '../../$types'

export async function load(event: PageServerLoadEvent): Promise<void> {
	const { locals } = event

	if (!locals.user) {
		throw redirect(302, '/')
	}
}
