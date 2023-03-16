<script lang="ts">
	import { applyAction, enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import Loading from '$lib/components/loading.svelte'
	import type {
		JourneyType,
		JourneyWithPassengers,
		SearchData,
	} from '$lib/types/destination'
	import type {
		ScheduleReturnType,
		ScheduleSelectedObj,
	} from '$lib/types/schedules'
	import { generatePassengers } from '$lib/utils/helper'
	import { bookingState } from '$lib/utils/stores'
	import { onMount } from 'svelte'
	import TimeSlot from './_components/time-slot.svelte'

	export let searchData: SearchData
	export let goToNext: () => void
	export let journey: JourneyType
	export let passengerInfo: JourneyWithPassengers

	let schedule: ScheduleReturnType = {
		outbound: [],
		inbound: [],
		token: '',
	}
	export let selected: ScheduleSelectedObj = {
		outbound: {
			train_id: 0,
			schedule_id: 0,
			product_id: 0,
			vehicle: {},
		},
		inbound: {
			train_id: 0,
			schedule_id: 0,
			product_id: 0,
		},
	}

	async function handleSearch() {
		const test = generatePassengers(searchData.passengers)
		console.log('TEST', test)

		const response = await fetch('/api/journey/search', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				origin: searchData.origin,
				directions: searchData.directions,
				outboundDate: searchData.outboundDate,
				inboundDate: searchData.inboundDate,
				passengers: generatePassengers(searchData.passengers),
			}),
		})

		const { schedule: sched, status, transaction } = await response.json()

		if (status === 'success') {
			journey = {
				outbound: sched.outbound,
				inbound: sched.inbound,
				transaction, // Do we need to pass this here?
			}
			passengerInfo = transaction
			schedule = sched

			bookingState.update((prev) => ({
				...prev,
				token: transaction.token,
				product_token: sched.token,
			}))

			/**
             * bookTrip.update((prev) => ({
				...prev,
				token: transaction.token,
				products_token: schedules.token
			}));
            */
		}
	}

	onMount(async () => {
		await handleSearch()
	})
</script>

<div class="select-container">
	<div class="book-trip-layout">
		<div class="journey">
			<form
				class="login-form"
				method="POST"
				action="?/addProductAndVehicles"
				use:enhance={() => {
					return async ({ result }) => {
						invalidateAll()
						await applyAction(result)
						console.log('TESTFF')
						goToNext()
					}
				}}
			>
				<input value={JSON.stringify(selected)} type="hidden" name="selected" />
				<div class="results-container">
					{#if schedule}
						<h1 class="heading">Select outbound journey</h1>
						{schedule.outbound.length}
						{#if schedule.outbound.length === 0}
							<Loading progress={true} />
							<div class="white-card" />
						{:else}
							{#each schedule.outbound as outbound}
								<TimeSlot
									bind:selected
									schedule={outbound}
									journey={journey.outbound}
									type="outbound"
								/>
							{/each}
						{/if}
						{#if searchData.directions.includes('inbound')}
							<h1 class="heading">Select inbound journey</h1>
							{#if schedule.inbound.length === 0}
								<Loading progress={true} />
								<div class="white-card" />
							{:else}
								{#each schedule.inbound as inbound}
									<TimeSlot
										bind:selected
										schedule={inbound}
										journey={journey.inbound}
										type="inbound"
									/>
								{/each}
							{/if}
						{/if}
					{/if}
				</div>
				<button type="submit">Submit</button>
			</form>
			<button
				on:click={() => {
					goToNext()
				}}>Next</button
			>
		</div>
	</div>
</div>

<style>
	.book-trip-layout {
		display: flex;
		flex-direction: column;
		width: 100%;
		margin: 0 auto;
	}
	.journey {
		width: 90%;
		margin: 0 auto;
	}

	h1 {
		font-family: 'Playfair Display';
		font-style: normal;
		font-weight: 600;
		font-size: 40px;
		line-height: 95px;
	}
	button {
		width: 100%;
	}

	.white-card {
		background: white;
		width: 100%;
		height: 340px;
		border-radius: 16px;
		margin: 25px 0;
	}

	@media only screen and (max-width: 768px) {
		h1.heading {
			font-size: 26px;
			line-height: 40px;
		}
		.journey {
			width: 100%;
		}
	}
</style>
