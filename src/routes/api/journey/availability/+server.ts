import { jsonResponse } from '$lib/utils/helper'

const vehicle_types = {
	2: 'cars',
	10: 'motorcycles',
	11: 'bikes',
}

export async function POST({ request }: { request: Request }) {
	const body = await request.json()

	const { token, ferry_id, vehicle_type, direction } = body

	const req = await fetch(
		`https://api.spex.snowfalltravel.com/mtr/vehicle-avail/${token}/${ferry_id}/${direction}`,
		{
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		}
	)

	const { data, status } = await req.json()

	if (status === 'success') {
		if (data[vehicle_types[vehicle_type as keyof typeof vehicle_types]]) {
			return jsonResponse(
				{
					status: 'success',
					data: true,
				},
				200
			)
		}
		return jsonResponse(
			{
				status: 'error',
				data: 'No vehicles available',
			},
			200
		)
	} else {
		return jsonResponse(
			{
				status: 'error',
				data: false,
			},
			200
		)
	}
}
