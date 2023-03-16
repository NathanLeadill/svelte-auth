type Account = {
	id: number;
	token: string;
	staff: boolean;
	admin: boolean;
	soc: boolean;
	support: boolean;
	flirtboard: boolean;
	driver: boolean;
	travel_agent: boolean;
	corporate_admin: boolean;
	stadler: boolean;
	email: string;
	password: string;
	firstname: string;
	lastname: string;
	mobile: string;
	invoiceable: boolean;
	active: boolean;
	created: number;
	modified: number;
};

export type AccountForgottenPassword = {
	id: number;
	account_id: number;
	token: string;
	created: Date;
	used: boolean;
};

type PassengerDetailsType = {
	id: number;
	accounts_id: number;
	passenger_type_id: number;
	firstname: string;
	lastname: string;
	birthday: string;
	mobile: string;
	email: string;
	gender: string;
	addons: any[];
	ssr: string;
	seat_id: number;
	seat_type_id: number;
	wagon: string;
	mult_set_id: number;
	relative_firstname: string;
	relative_lastname: string;
	relative_mobile: string;
	subscribed: boolean;
	price: number;
	real_price: number;
	tax: number;
	vat: number;
	voucher_id: number;
	birth_country: string;
};

type PassportDetailsType = {
	passport_number: string;
	passport_issuing_country: string;
	passport_nationality: string;
	passport_expiry: string;
	id_number: string;
	id_expiry: string;
	idType?: string;
};

type PassengerDetailsCombined = PassengerDetailsType & PassportDetailsType;

type JWTAccountModel = {
	id: number;
	token: string;
	staff: boolean;
	admin: boolean;
	soc: boolean;
	support: boolean;
	flirtboard: boolean;
	driver: boolean;
	travel_agent: boolean;
	corporate_admin: boolean;
	stadler: boolean;
	email: string;
	password: string;
	firstname: string;
	lastname: string;
	mobile: string;
	invoiceable: boolean;
	active: boolean;
	created: number;
	modified: number;
};

type ResetPasswordForm = {
	password: string;
	confirmPassword: string;
};

export type {
	Account,
	PassengerDetailsType,
	PassengerDetailsCombined,
	JWTAccountModel,
	ResetPasswordForm
};
