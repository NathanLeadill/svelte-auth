export const passengerTypeMap = {
	adults: 'Adult',
	children: 'Child',
	infant: 'Infant',
}

export const passengerTypeIds = {
	adults: 1,
	children: 4,
}

export const passengerIdToString = {
	1: 'Adult',
	4: 'Child',
}

export const vehicleIds = {
	2: 'Car',
	10: 'Bike',
	11: 'Motorbike',
}

export const passengerFormRequiredFields = [
	'firstname',
	'lastname',
	'mobile',
	'emailaddress',
	'birthday',
	'birth_country',
	'gender',
	'idType',
	'ssr',
]

export const passengerIdFormRequiredFields = ['id_number', 'id_expiry']

export const passengerPassportFormRequiredFields = [
	'passport_number',
	'passport_issuing_country',
	'passport_nationality',
	'passport_expiry',
]

export const paymentFormRequiredFields = [
	'cardNumber',
	'cardExpiry',
	'cardCVC',
	'cardName',
]
