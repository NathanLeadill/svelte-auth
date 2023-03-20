<script lang="ts">
	import type { JourneyType } from '$lib/types/destination'
	import {
		getDateTimeWithoutTimezone,
		getLocationById,
	} from '$lib/utils/helper'
	import { vehicleIds } from '$lib/utils/options'
	import { bookingState } from '$lib/utils/stores'
	import BookingDetails from './_components/booking-details.svelte'
	import PassengerSummaryBox from './_components/passenger-summary-box.svelte'

	export let journey: JourneyType
	export let goToNext: () => void

	let acceptedTerms = false

	function handleContinue() {
		goToNext()
	}
</script>

<div class="summary-container">
	<h1 class="title">Summary</h1>
	<p class="tag-line">
		Please read the details below carefully before continuing to payment
	</p>

	<h2 class="subtitle">Passengers</h2>
	<div class="passengers">
		{#each $bookingState.journey.outbound.passengers as passenger}
			<PassengerSummaryBox {passenger} />
		{/each}
	</div>
	<h2 class="subtitle">Ferry Details</h2>

	<div class="ferry-routes">
		{#if $bookingState.journey.outbound}
			<div class="ferry-route">
				<div class="block">
					<div class="departure-column">
						<p class="port-location-label">
							{getLocationById($bookingState.journey.outbound.origin_id)}
						</p>
						<p class="travel-time-label">
							{$bookingState.journey.outbound?.departure_time}
						</p>
						<p class="travel-date-label">
							{getDateTimeWithoutTimezone(
								$bookingState.journey.outbound.date
							).toLocaleDateString('en-GB', {
								year: 'numeric',
								month: 'short',
								day: 'numeric',
							})}
						</p>
					</div>
					<div class="journey-icon">
						<div class="img-container">
							<div />
							<img src="/images/icons/ferry.svg" alt="ferry icon" />
							<div />
						</div>
					</div>
					<div class="arrival-column">
						<p class="port-location-label">
							{getLocationById($bookingState.journey.outbound?.destination_id)}
						</p>
						<p class="travel-time-label">
							{$bookingState.journey.outbound?.arrival_time}
						</p>
						<p class="travel-date-label">
							{getDateTimeWithoutTimezone(
								$bookingState.journey.outbound.date
							).toLocaleDateString('en-GB', {
								year: 'numeric',
								month: 'short',
								day: 'numeric',
							})}
						</p>
					</div>
				</div>
				<div class="down">
					<div class="vehicle-column">
						<span class="vehicle-label">
							{#if $bookingState.journey.outbound.vehicle_places.length > 0}
								{$bookingState.journey.outbound.vehicle_places[0].quantity}
								x
								{vehicleIds[
									$bookingState.journey.outbound.vehicle_places[0]
										.vehicle_place_id
								]}
							{/if}
							{#if $bookingState.journey.outbound.vehicle_places.length === 0}
								Foot Passenger
							{/if}
							<!-- {$bookingState.journey.outbound.vehicle_places.length > 0
								? `${$bookingState.journey.outbound.vehicle_places[0].quantity} x ${$bookingState.outbound.vehicle_places[0].description}`
								: 'Foot Passenger'} -->
						</span>
					</div>
					<div class="ticket-type-column">
						<span class="ticket-type-label"
							>{$bookingState.journey.outbound.product_name}</span
						>
					</div>
				</div>
			</div>
		{/if}
		{#if $bookingState.journey.inbound.date}
			<div class="ferry-route">
				<div class="departure-column">
					<p class="port-location-label">
						{getLocationById($bookingState.journey.inbound.origin_id)}
					</p>
					<p class="travel-time-label">
						{$bookingState.journey.inbound.departure_time}
					</p>
					<p class="travel-date-label">
						{getDateTimeWithoutTimezone(
							$bookingState.journey.inbound.travel_date
						).toLocaleDateString('en-GB', {
							year: 'numeric',
							month: 'short',
							day: 'numeric',
						})}
					</p>
				</div>
				<div class="journey-icon">
					<div class="img-container">
						<div />
						<img src="/images/icons/ferry.svg" alt="ferry icon" />
						<div />
					</div>
				</div>
				<div class="arrival-column">
					<p class="port-location-label">
						{getLocationById($bookingState.journey.inbound.destination_id)}
					</p>
					<p class="travel-time-label">20:10</p>
					<p class="travel-date-label">
						{getDateTimeWithoutTimezone(
							$bookingState.journey.inbound.travel_date
						).toLocaleDateString('en-GB', {
							year: 'numeric',
							month: 'short',
							day: 'numeric',
						})}
					</p>
				</div>
				<div class="down">
					<div class="vehicle-column">
						<span class="vehicle-label">
							{#if $bookingState.journey.inbound.vehicle_places.length > 0}
								{$bookingState.journey.inbound.vehicle_places[0].quantity}
								x
								{vehicleIds[
									$bookingState.journey.inbound.vehicle_places[0]
										.vehicle_place_id
								]}
							{/if}
							{#if $bookingState.journey.inbound.vehicle_places.length === 0}
								Foot Passenger
							{/if}
							<!-- {$bookingState.journey.outbound.vehicle_places.length > 0
								? `${$bookingState.journey.outbound.vehicle_places[0].quantity} x ${$bookingState.outbound.vehicle_places[0].description}`
								: 'Foot Passenger'} -->
						</span>
					</div>
					<div class="ticket-type-column">
						<span class="ticket-type-label"
							>{$bookingState.journey.inbound.product_name}</span
						>
					</div>
				</div>
			</div>
		{/if}
	</div>

	<BookingDetails journey={$bookingState.journey} />

	<div class="travel-icons">
		<div class="document">
			<div class="header">Travel document</div>
			<div class="message">
				ID-Card (enables us to ensure that you have a ticket)
			</div>
		</div>
		<div class="information">
			<div class="header">Travel information</div>
			<div class="message">Mail and SMS ( to facilitate .....)</div>
		</div>
	</div>

	<div class="luggage-notice">
		<h4 class="luggage-heading">Those travelling with luggage</h4>
		<p>
			We can take you between Split Airport and Split Town (15 mins), Bol (on
			Brac island, about 65-105 mins) or Stari Grad ((on Hvar Island, about
			60-110 mins plus that we have a convenient transfer to/from Hvar Town for
			50 Kuna). Some sailings have a short stop off in a port, but several
			services travel directly with no stops. Please check the sailing schedule
			for your selected day.
		</p>
	</div>

	<div class="terms-container">
		<div class="terms">
			<input
				type="checkbox"
				id="terms"
				name="terms"
				bind:checked={acceptedTerms}
			/>
			<label for="terms">
				I hereby accept the Terms and conditions of travel and consent to the
				processing of personal data according to the information presented.
			</label>
		</div>
	</div>

	<div class="continue">
		<button on:click={handleContinue} disabled={!acceptedTerms}>Continue</button
		>
	</div>
</div>

<style>
	h2 {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 600;
		font-size: 28px;
		line-height: 34px;
		margin-top: 75px;
	}
	.passengers {
		display: flex;
		gap: 30px;
		flex-wrap: wrap;
	}
	.ferry-route {
		display: flex;
		gap: 30px;
		align-items: center;
		margin-bottom: 30px;
		background: #ffffff;
		border: 0.5px solid #c7c7c7;
		border-radius: 16px;
		padding: 30px 50px;
	}

	.img-container {
		display: flex;
		align-items: center;
	}
	.img-container div {
		height: 2px;
		background: black;
		width: 55px;
	}
	.img-container img {
		height: 20px;
		margin: 0 10px;
	}

	.vehicle-column {
		flex-basis: 40%;
		text-align: center;
		font-family: 'Montserrat';
		font-weight: 600;
		font-size: 24px;
	}

	.ticket-type-column {
		text-align: center;
		font-family: 'Montserrat';
		font-weight: 600;
		font-size: 24px;
	}
	.luggage-notice {
		margin-top: 30px;
		background: rgba(34, 40, 59, 0.03);
		border: 1px solid #22283b36;
		border-radius: 14px;
		padding: 45px 60px;
	}
	.luggage-heading {
		font-family: 'Playfair Display';
		font-style: normal;
		font-weight: 600;
		font-size: 40px;
		line-height: 95px;
		margin: 0;
	}
	.luggage-notice p {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 400;
		font-size: 18px;
		line-height: 32px;
	}
	.terms-container {
		border: 0.5px solid #c7c7c7;
		border-radius: 16px;
		margin: 50px 0;
		padding: 25px 30px;
	}
	.terms-container input {
		width: 2%;
	}

	.terms-container label {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 400;
		font-size: 15px;
		line-height: 24px;
		color: #000000;
	}
	.port-location-label {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 400;
		font-size: 18px;
		line-height: 14px;

		display: flex;
		align-items: center;

		color: #000000;

		text-transform: capitalize;
		margin: 0 0 10px 0;
	}
	.travel-time-label {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 600;
		font-size: 24px;
		line-height: 16px;

		color: #000000;
	}
	.travel-date-label {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 24px;
		letter-spacing: 0.12px;
	}

	.travel-icons {
		display: flex;
		gap: 50px;
		margin-top: 50px;
	}

	.travel-icons .document {
		position: relative;
		padding: 30px 50px;
	}

	.travel-icons .information {
		position: relative;
		padding: 30px 50px;
	}

	.travel-icons .document::before {
		content: url('/images/icons/documents.png');
		display: block;
		width: 40px;
		height: 40px;
		position: absolute;
		left: 5px;
	}

	.travel-icons .information::before {
		content: url('/images/icons/info-bubble.png');
		display: block;
		width: 40px;
		height: 40px;
		position: absolute;
		left: 5px;
	}

	.travel-icons .header {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 600;
		font-size: 22px;
		line-height: 35px;
		color: #000000;
	}

	.travel-icons .message {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 26px;
		color: #000000;
	}
	.continue button {
		width: 100%;
	}

	.continue button:disabled {
		pointer-events: none;
	}

	.continue button:not(:disabled):hover {
		background-color: #151823;
		cursor: pointer;
		font-weight: 700;
	}
	.ferry-route {
		display: flex;
		flex-direction: row;
	}
	.ferry-route .departure-column,
	.ferry-route .arrival-column {
		text-align: center;
	}
	.port-location-label {
		justify-content: center;
	}
	.ferry-route .block {
		display: flex;
		align-items: center;
		flex-basis: 50%;
		gap: 25px;
	}
	.ferry-route .down {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-basis: 40%;
		justify-content: space-between;
	}

	.ferry-route .down .vehicle-column {
		flex-basis: 50%;
	}

	.ferry-route .down .ticket-type-label {
		flex-basis: 40%;
	}

	@media only screen and (max-width: 768px) {
		.summary-container {
			padding-top: 50px;
		}
		.passengers {
			flex-direction: column;
		}
		.ferry-routes {
			display: flex;
			flex-direction: column;
		}
		.journey-icon .img-container div {
			width: 20px;
		}
		.vehicle-label,
		.ticket-type-label {
			font-size: 18px;
		}

		.ferry-route {
			flex-direction: column;
			gap: 15px;
		}
		.ferry-route .down {
			flex-direction: column;
			align-items: flex-start;
			gap: 15px;
			align-items: center;
		}
		.travel-icons {
			flex-direction: column;
			gap: 15px;
		}

		.travel-icons div.document,
		.travel-icons div.information {
			padding: 0 30px 0 65px;
		}

		.luggage-notice {
			padding: 20px;
		}
		.luggage-heading {
			font-size: 40px;
			line-height: 50px;
		}
		.terms-container input {
			width: 10%;
		}
	}
</style>
