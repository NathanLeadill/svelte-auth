import { jsonResponse } from '$lib/utils/helper';
type CarMakeObject = {
	Make: string;
};

type CarModelObject = {
	Model: string;
};
export async function GET({ params: { make } }: { params: { make: string } }) {
	const response = await fetch(
		`https://api.spex.snowfalltravel.com/mtr/vehicles/make/${make}/model/list`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		}
	);

	const {
		data: { models }
	} = await response.json();

	const modelArrays = models
		.map((model: CarModelObject) => {
			return Object.values(model);
		})
		.flat();

	return jsonResponse(modelArrays, 200);
}
