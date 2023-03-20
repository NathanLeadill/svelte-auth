<script lang="ts">
	import type { JourneyType, SearchData } from '$lib/types/destination'
	import { bookingState } from '$lib/utils/stores'
	import SummaryRouteSection from './_components/summary-route-section.svelte'

	export let searchData: SearchData
	export let journey: JourneyType
	export let goToNext: () => void

	let mobileExpanded = false
	console.log('booking state', $bookingState)

	// Get selected route by user
	$: selectedJourney = {
		outbound:
			$bookingState?.journey && $bookingState?.journey.outbound.length > 0
				? {
						...$bookingState?.journey?.outbound.find(
							(el) =>
								el.train_id === journey.outbound.train_id &&
								el.schedule_id === journey.outbound.schedule_id
						),
				  }
				: $bookingState.journey?.outbound,
		inbound:
			$bookingState?.journey && $bookingState?.journey.inbound.length > 0
				? {
						...$bookingState?.journey?.inbound.find(
							(el) =>
								el.train_id === journey.inbound.train_id &&
								el.schedule_id === journey.inbound.schedule_id
						),
				  }
				: $bookingState.journey?.inbound,
	}
	// Choose selected route from api and select the active product
	$: selectedRoute = {
		outbound: selectedJourney.outbound && {
			...selectedJourney.outbound,
			products:
				selectedJourney?.outbound?.products &&
				selectedJourney?.outbound?.products.find(
					(el) => el.id === journey.outbound.product_id
				),
		},
		inbound: selectedJourney.inbound && {
			...selectedJourney.inbound,
			products:
				selectedJourney.inbound?.products &&
				selectedJourney.inbound?.products.find(
					(el) => el.id === journey.inbound.product_id
				),
		},
	}
	$: console.log(
		'SELECTED JOURNEY: ',
		selectedJourney,
		'SELECTED ROUTE: ',
		selectedRoute
	)

	// Calculate total price
	$: total = () => {
		let total = 0
		if (selectedRoute?.outbound) {
			if (selectedRoute.outbound.products) {
				total += selectedRoute.outbound.products.price
			}
			if (selectedRoute.inbound.products) {
				total += selectedRoute.inbound.products.price
			}
		}
		return total.toFixed(2)
	}
</script>

<!-- No need for a keypress on a mobile ting -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<slot name="summary">
	<div
		class="summary-column"
		on:click={() => {
			mobileExpanded = !mobileExpanded
		}}
	>
		<div class="summary">
			<div class="heading">Your booking summary</div>
			<div class="total">
				<p class="total-label">Total:</p>
				<p class="total-amount">
					{#if $bookingState?.price}
						€ {$bookingState?.price.amount.toFixed(2)}
					{:else}
						€ {total()}
					{/if}
				</p>
			</div>
		</div>
		<div class="journey-summary" class:expanded={mobileExpanded}>
			{#if selectedRoute?.outbound?.schedule_id}
				<SummaryRouteSection selectedJourney={selectedRoute.outbound} />
			{/if}
			{#if selectedRoute?.inbound?.schedule_id}
				<SummaryRouteSection selectedJourney={selectedRoute.inbound} />
			{/if}
		</div>
	</div>
</slot>

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
		border-radius: 16px;
		position: relative;
		display: flex;
		gap: 50px;
		flex-direction: column;
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
