<script lang="ts">
	import Wizard from '$lib/components/wizard.svelte'
	import type { PassengerDetailsType } from '$lib/types/account'

	import type {
		JourneyType,
		JourneyWithPassengers,
		SearchData,
	} from '$lib/types/destination'
	import { onMount } from 'svelte'
	import PassengerDetails from './_components/passenger-details.svelte'
	import SelectJourney from './_components/select-journey.svelte'

	export let data
	let searchData: SearchData

	onMount(() => {
		if (data && data.params) {
			searchData = data.params
		} else {
			console.log('ini')

			const transformedParams = transformState(history.state)
			if (transformedParams) {
				searchData = transformedParams
			}
		}

		if (!searchData || !searchData.directions) {
			window.location.href = '/#book-trip'
		}
	})

	function transformState(state) {
		return {
			origin: state.origin,
			directions: state.directions.split(','),
			outboundDate: state.outboundDate,
			inboundDate: state.inboundDate,
			passengers: JSON.parse(state.passengers),
		}
	}

	async function getLink() {
		try {
			const request = await fetch('/api/journey/share', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					searchData,
				}),
			})
			const returnedJWTToken = await request.json()
			navigator.clipboard.writeText(
				`localhost:5173/book-trip?token=${returnedJWTToken}`
			)
		} catch (ex) {
			console.log('error', ex)
		}
	}
	let journey: JourneyType
	let passengerDetails: PassengerDetailsType[]
	let passengerInfo: JourneyWithPassengers
	let selected = {}
	let test = {}
</script>

{#if !searchData?.directions}
	<p>Redirecting...</p>
	<pre>
        {JSON.stringify(test, null, 2)}
    </pre>
{:else}
	<Wizard
		steps={{
			'select-trip': 'Select Trip',
			'passenger-details': 'Passenger Details',
			summary: 'Summary',
			payment: 'Payment',
			complete: 'Complete',
		}}
		value="select-trip"
		let:value
		let:goToNext
		let:goToPrevious
		urlNavigation
	>
		<!-- TODO WHEN YOU SELECT A JOURNEY. UPDATE THE DAMN OBJECT!!!! -->
		<div class="column-container" class:value>
			<button on:click={getLink}>Get Link</button>
			<div class="body-column">
				{#if value === 'select-trip'}
					<SelectJourney
						bind:selected={test}
						{goToNext}
						{searchData}
						bind:journey
						bind:passengerInfo
					/>
				{:else if value === 'passenger-details'}
					<PassengerDetails selected={test} />
					<div class="container">
						<h1>test</h1>
						<pre>
                    {JSON.stringify(test)}
                </pre>
					</div>
				{/if}
			</div>
			<!-- <div class="summary-column">
			{#if journey && journey.outbound}
				<SummaryColumn {searchData} {journey} {goToNext} />
			{/if}
		</div> -->
		</div>
	</Wizard>
{/if}

<style>
	.column-container {
		display: flex;
		flex-direction: row;
		gap: 40px;
	}

	.body-column {
		flex-basis: 70%;
	}

	.summary-column {
		flex-basis: 30%;
	}
	.container {
		margin: 100px auto;
	}
	@media only screen and (max-width: 768px) {
		.column-container {
			flex-direction: column;
			max-width: 95%;
			margin: 0 auto;
		}
		.body-column {
			flex-basis: 100%;
		}
		.summary-column {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			z-index: 9999999;
		}
	}
</style>
