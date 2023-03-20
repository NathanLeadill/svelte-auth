<script lang="ts">
	import type { TicketUnitSchedules } from '$lib/types/schedules'
	import { groupBy } from '$lib/utils/helper'
	import { passengerIdToString } from '$lib/utils/options'
	import type { BookTripState } from '$lib/utils/stores'

	// TODO TOO LATE AT NIGHT
	export let journey: BookTripState

	type BookingTypes = [string, TicketUnitSchedules[]]

	console.log('TEST: ', journey)
	const booking_types = Object.entries(
		groupBy(journey.outbound?.passengers, 'passenger_type_id')
	)

	const cars = {
		2: 'Car',
		3: 'Motorbike',
	}

	function getPassengerIdLabel(passenger_type_id: string): string {
		return passengerIdToString[
			Number(passenger_type_id) as keyof typeof passengerIdToString
		]
	}
</script>

<h2>Booking Details</h2>
<table>
	<thead>
		<tr>
			<th>Ticket Type</th>
			<th>Fees and charges</th>
			<th>Total per passenger</th>
			<th>Total</th>
		</tr>
	</thead>
	<tbody>
		{#each booking_types as [passenger_type_id, booking]}
			<tr>
				<td>
					{booking.length}
					{getPassengerIdLabel(passenger_type_id)}
				</td>
				<td>
					€ {Number(Number(booking[0].vat) + Number(booking[0].tax))}
				</td>
				<td
					>€ {(
						Number(booking[0].price) * Number(journey.inbound.date ? 2 : 1)
					).toFixed(2)}
				</td>
				<td>
					€ {(
						Number(booking.length * Number(booking[0].price)) *
						Number(journey.inbound.date ? 2 : 1)
					).toFixed(2)}
				</td>
			</tr>
		{/each}
		{#if journey.outbound.vehicle_places.length > 0}
			{#each journey.outbound.vehicle_places as vehicle}
				<tr>
					<td>
						{vehicle.quantity}
						{vehicle.description}
					</td>
					<td>
						€ {Number(Number(vehicle.vat) + Number(vehicle.tax))}
					</td>
					<td>€ {Number(vehicle.price).toFixed(2)} </td>
					<td>
						€ {Number(vehicle.quantity * Number(vehicle.price)).toFixed(2)}
					</td>
				</tr>
			{/each}
		{/if}
	</tbody>
</table>

<style>
	h2 {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 600;
		font-size: 28px;
		line-height: 34px;
		margin-top: 75px;
	}
	table {
		border-collapse: collapse;
		width: 100%;
	}
	thead {
		border-bottom: 0.5px solid rgba(34, 40, 59, 0.5);
	}
	thead tr th {
		padding: 20px 10px;
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 600;
		font-size: 18px;
		line-height: 24px;
		text-align: start;
	}

	tbody tr td {
		padding: 26px 10px;
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;
	}

	@media only screen and (max-width: 768px) {
		thead tr th {
			font-size: 14px;
		}
	}
</style>
