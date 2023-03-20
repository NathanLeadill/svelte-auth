import type { ValidationError } from '$lib/types/common'

export function containsNoErrors<TData extends Record<string, unknown>>(
	errors: ValidationError<TData>
): boolean {
	const errorArray = Object.values(errors).flat()
	return errorArray.length === 0
}
