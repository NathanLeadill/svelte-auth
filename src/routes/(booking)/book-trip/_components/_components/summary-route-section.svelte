<script lang="ts">
	import {
		calculateJourneyDuration,
		getDateTimeWithoutTimezone,
		getLocationById,
	} from '$lib/utils/helper'
	export let selectedJourney
	$: console.log('selectedJourney', selectedJourney)
</script>

<div class="journey-summary">
	{#if selectedJourney}
		<div class="outbound">
			<p class="journey-date-label">
				{getDateTimeWithoutTimezone(
					selectedJourney.travel_date || selectedJourney.date
				).toLocaleDateString('en-GB', {
					year: 'numeric',
					month: 'short',
					day: 'numeric',
				})} -
				<span class="ticket-type-label">
					<!-- @todo fix -->
					{selectedJourney.product_name ||
						selectedJourney?.products.name.toLowerCase()}
				</span>
			</p>
			<div class="journey-route">
				<div class="journey-outbound">
					<p class="location">
						{getLocationById(selectedJourney.origin_id)}
					</p>
				</div>
				<div class="icon-and-length">
					<div class="img-container">
						<div />
						<img src="/images/icons/ferry.svg" alt="ferry logo" />
						<div />
					</div>
				</div>
				<div class="journey-inbound">
					<p class="location">
						{getLocationById(selectedJourney.origin_id === 7 ? 8 : 7)}
					</p>
				</div>
			</div>
			<div class="active-schedule">
				<div class="time">
					{selectedJourney.departure_time}
				</div>
				<div class="row">
					<p class="duration-label">
						{calculateJourneyDuration(
							selectedJourney.arrival_time,
							selectedJourney.departure_time,
							true
						)}
					</p>
				</div>
				<div class="time">
					{selectedJourney.arrival_time}
				</div>
			</div>
			<div class="ticket-totals">
				<!-- {#if $bookTrip.vehicles.outbound.id > 0}
						<div class="vehicle-total">
							<p class="vehicle-label">
								{`${$bookTrip.vehicles?.outbound?.make} - ` || ''}{$bookTrip
									.vehicles?.outbound?.model || ''}
								<span class="vehicle-registration">
									{$bookTrip.vehicles?.outbound?.registration || ''}
								</span>
							</p>

							{#if $bookTrip.vehicles.outbound.make !== '' && $bookTrip.vehicles.outbound.model !== ''}
								<p class="vehicle-places-label">
									€ {Number(
										vehicle_places.find(
											(el) => el.id === $bookTrip.vehicles.outbound.id
										)?.price
									).toFixed(2)}
								</p>
							{/if}
						</div>
					{/if} -->
			</div>
		</div>
	{/if}
</div>

<style>
	.summary-column {
		flex-basis: 35%;
		margin: 150px auto 0 auto;
		gap: 65px;
		display: flex;
		flex-direction: column;
	}
	.summary {
		height: 175px;
	}

	.journey-summary {
		background: white;
		border-radius: 16px;
		position: relative;
	}

	.journey-summary::before {
		content: ' ';
		display: block;
		width: 35px;
		height: 35px;
		background: #f1f1f1;
		left: -18px;
		top: calc(50% - 20px);
		position: absolute;
		border-radius: 50%;
	}
	.journey-summary::after {
		content: ' ';
		display: block;
		width: 35px;
		height: 35px;
		background: #f1f1f1;
		right: -15px;
		top: calc(50% - 20px);
		position: absolute;
		border-radius: 50%;
	}

	.journey-divider {
		border: 0.2px solid #ddd;
		margin: 25px 0 5px;
	}
	.journey-route {
		display: flex;
		align-items: center;
	}

	.journey-route > div {
		flex-basis: 33.33%;
		text-align: center;
	}

	.vehicle-total {
		display: flex;
		justify-content: space-between;
		width: 80%;
		margin: 0 auto;
	}

	.active-schedule {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.active-schedule > div {
		flex-basis: 33.33%;
		text-align: center;
	}

	.journey-date-label {
		font-size: 16px;
		font-weight: 600;
		font-family: 'Montserrat';
		color: #121212;
	}

	.journey-date-label > span {
		text-transform: capitalize;
	}

	.outbound,
	.inbound {
		height: auto;
		padding: 20px 25px;
	}

	.dashed {
		border: 1px dashed lightgrey;
		position: absolute;
		top: calc(50% + -10px);
		width: 88%;
		left: 5.5%;
	}

	.heading {
		background-color: #22283b;
		border-top-right-radius: 16px;
		border-top-left-radius: 16px;
		padding: 26px 70px;
		color: white;
		font-size: 22px;
		font-weight: 600;
		text-align: center;
	}

	.total {
		display: flex;
		padding: 24px 38px;
		background: white;
		border-bottom-left-radius: 16px;
		border-bottom-right-radius: 16px;
	}
	.total-label {
		flex-grow: 1;
		font-family: 'Montserrat';
		font-weight: 600;
		font-size: 24px;
	}

	.total-amount {
		font-family: 'Montserrat';
		font-weight: 700;
		font-size: 24px;
	}

	.img-container {
		display: flex;
		align-items: center;
	}
	.img-container div {
		height: 2px;
		background: black;
		width: 100%;
	}
	.img-container img {
		height: 20px;
		margin: 0 10px;
	}

	.journey-outbound,
	.journey-inbound {
		text-transform: capitalize;
	}

	.journey-route .location {
		font-family: 'Montserrat';
		font-size: 20px;
		font-weight: 600;
		color: black;
	}

	.ticket-totals {
		display: flex;
	}
	.vehicle-label {
		font-family: 'Montserrat';
		font-weight: 600;
		font-size: 18px;
	}
	.vehicle-registration {
		font-style: italic;
		font-weight: 400;
		font-size: 14px;
		margin-left: 20px;
	}
	.active-schedule {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.active-schedule > div {
		font-family: 'Montserrat';
		font-size: 20px;
		font-weight: 400;
	}
	.duration-label {
		font-size: 15px;
	}

	.summary-column .summary .heading {
	}

	/* Create media queries */
	@media only screen and (max-width: 768px) {
		.journey-summary {
			/* display: none; */
		}
		.journey-summary::before,
		.journey-summary::after {
			display: none;
		}
		.summary-column {
			gap: 0;
			margin-top: 0;
		}

		.journey-summary {
			display: none;
		}

		.journey-summary.expanded {
			display: block;
		}
	}
</style>
