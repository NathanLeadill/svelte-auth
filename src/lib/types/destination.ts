import type { PassengerDetailsType } from './account';
import type { ScheduleType } from './schedules';

type Destination = {
	name: string;
	images: string[];
};

type SearchData = {
	directions: string[];
	origin: string;
	passengers: PassengerOptions;
	outboundDate: Date;
	inboundDate: Date;
};

type PassengerOptions = {
	adults: number;
	children: number;
	infants: number;
	pets: number;
};

type UserSearchData = SearchData & {
	user: any;
};

type JourneyTransactionType = {
	id: number;
	external_id: string;
	external_reference: string;
	stripe_token: string;
	stripe_email: string;
	stripe_charge: string;
	token: string;
	channel: string;
	transaction_status_id: number;
	invoiced: number;
	psp_id: number;
	products_token: string;
	payment_type_id: number;
	affiliate_id: number;
	account_id: number;
	booking_id: number;
	booking_reference: string;
	agreement_id: number;
	reference: string;
	amount: number;
	net: number;
	vat: number;
	tax: number;
	refund: number;
	payment_pending: number;
	payed_date: string;
	created: number;
	modified: number;
	transaction_type: number;
	voucher_code: string;
	audit: string[];
	inbound?: ScheduleType & {
		addons: any[];
		passengers: PassengerDetailsType[];
	};
	outbound: ScheduleType & {
		addons: any[];
		passengers: PassengerDetailsType[];
	};
};

type ResponseJourneyType = {
	addons: any[];
	arrival_time: string;
	date: string;
	departure_time: string;
	destination_id: number;
	origin_id: number;
	passengers: PassengerDetailsType[];
	product_id: number;
	product_name: string;
	schedule_id: number;
	total_price: number;
	total_real_price: number;
	train_id: number;
	vehicle_places: any[];
};

// tODO TEMP
type JourneyType = {
	outbound: ScheduleType[];
	inbound: ScheduleType[];
	transaction: JourneyTransactionType;
};

// fix the record
type JourneyWithPassengers = {
	outbound: ResponseJourneyType[];
	inbound: ResponseJourneyType[];
	passengers: PassengerDetailsType[];
	token: string;
};

type SearchOptions = {
	location: {
		from: string;
		to: string;
	};
	date: {
		depart: Date;
		return: Date;
	};
	passengers: string;
	returnTrip: boolean;
};

export const locationIds = {
	malta: 7,
	ragusa: 8
};
export const locationLabels = {
	1: 'Split Airport',
	2: 'Split (Town)',
	3: 'Bol (Brac)',
	4: 'Stari Grad (Hvar)',
	6: 'Hvar (Town)',
	7: 'Malta',
	8: 'Ragusa (Sicily)'
};

export type {
	Destination,
	SearchData,
	UserSearchData,
	JourneyType,
	JourneyWithPassengers,
	SearchOptions,
	JourneyTransactionType,
	PassengerOptions,
	ResponseJourneyType
};
