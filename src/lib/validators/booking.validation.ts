import type { ValidationError } from '$lib/types/common'
import type { PaymentDetailsType } from '$lib/types/transaction'
import validator from 'validator'
import { containsNoErrors } from './common.validation'

export function validateStringContainsOnlyLetters(input: string) {
	return /^([A-zÀ-ÿ^0-9 ]*)$/g.test(input) ? [] : ['Invalid input']
}

export function validateStringContainsOnlyNumbers(input: string) {
	console.log(
		'Input',
		input,
		'Regex',
		/^[0-9]+$/,
		'Result',
		/^[0-9]+$/.test(input)
	)

	return /^[0-9]+$/.test(input) ? [] : ['Invalid input']
}

export function validatePhoneNumber(input: string) {
	return validator.isMobilePhone(input) ? [] : ['Invalid phone number']
}

export function validateEmailAddress(input: string) {
	return validator.isEmail(input) ? [] : ['Invalid email address']
}

export function validatePassportNumber(input: string) {
	return /^[a-zA-Z0-9]+$/.test(input) ? [] : ['Invalid passport number']
}

export function validateCreditCardNumber(input: string) {
	return /^[0-9]{16}$/.test(input) ? [] : ['Invalid credit card number']
}

export function validateDateIsOlderThanToday(input: string | Date, days = 1) {
	if (typeof input === 'string') input = new Date(input)
	const today = new Date().getTime() + Number(1000 * 60 * 60 * 24 * days) // Expiry minimum 30 days
	return input.getTime() > today ? [] : ['Invalid date']
}

export function valdiateCardDetails(
	data: Partial<PaymentDetailsType>
): [boolean, ValidationError<PaymentDetailsType>[]] {
	console.log('Data', data.number?.replace(/ /g, ''))

	const arrErrors = {
		name: !data.name?.trim().length
			? ['This field is required']
			: validateStringContainsOnlyLetters(data.name),
		number: !data.number?.trim().length
			? ['This field is required']
			: validateStringContainsOnlyNumbers(data.number.replace(/ /g, '')),
		expireDate: !data.expireDate
			? ['This field is required']
			: validateDateIsOlderThanToday(data.expireDate),
		cvc: !data.cvc?.trim().length
			? ['This field is required']
			: validateStringContainsOnlyNumbers(data.cvc),
	}
	console.log('ArrErrors', arrErrors)
	const containsErrors = containsNoErrors(arrErrors)
	console.log('ContainsErrors', containsErrors)

	return [containsErrors, [arrErrors]]
}
