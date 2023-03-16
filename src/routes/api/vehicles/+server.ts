import { jsonResponse } from '$lib/utils/helper';
type CarMakeObject = {
	Make: string;
};
export async function GET() {
	const response = await fetch('https://api.spex.snowfalltravel.com/mtr/vehicles/make/list', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	const {
		data: { makes }
	} = await response.json();
	const makeArrays = makes
		.map((make: CarMakeObject) => {
			return Object.values(make);
		})
		.flat();

	return jsonResponse(makeArrays, 200);
}
