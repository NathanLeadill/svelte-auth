<script lang="ts">
	import Loading from '$lib/components/loading.svelte'
	import { generateTransactionData } from '$lib/helpers'
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
	}
	export let selected: ScheduleSelectedObj = {
		outbound: {
			train_id: 0,
			schedule_id: 0,
			product_id: 0,
			vehicle: {
				id: 0,
				make: '',
				model: '',
				registration: '',
				quantity: 1,
			},
		},
		inbound: {
			train_id: 0,
			schedule_id: 0,
			product_id: 0,
			vehicle: {
				id: 0,
				make: '',
				model: '',
				registration: '',
				quantity: 1,
			},
		},
		tokens: {
			token: '',
			products_token: '',
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
				// outbound: sched.outbound,
				// inbound: sched.inbound,
				transaction, // Do we need to pass this here?
			}
			passengerInfo = transaction
			schedule = sched
			console.log('Transaction', transaction)

			// alternative
			bookingState.update((prev) => ({
				tokens: {
					token: transaction.token,
					products_token: sched.token,
				},
				searchData,
				journey: {
					outbound: [
						...sched.outbound.map((el) => ({
							...el,
							passengers: transaction.outbound.passengers,
						})),
					],
					inbound: sched.inbound,
				},
			}))
		}
	}

	async function addProduct() {
		//  @TODO TEMP FIX FOR DEMO NEED TO FILTER
		const activeRoute = schedule.outbound.find(
			(route) => route.schedule_id === selected.outbound.schedule_id
		)
		console.log('Selected', selected)

		const generatedPayload = generateTransactionData(
			searchData,
			schedule,
			$bookingState.tokens,
			{
				outbound: passengerInfo.outbound.passengers,
				inbound: passengerInfo.inbound.passengers,
			},
			selected,
			{
				outbound: selected.outbound.vehicle,
				inbound: selected.inbound.vehicle,
			}
		)

		const req = await fetch('/api/journey/transaction', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(generatedPayload),
		})

		const {
			status,
			data: { transaction },
		} = await req.json()

		if (status === 'success') {
			console.log('BEFORE')

			bookingState.update((prev) => ({
				...prev,
				journey: {
					outbound: transaction.outbound,
					inbound: transaction.inbound,
				},
				price: {
					amount: transaction.amount,
					vat: transaction.vat,
					tax: transaction.tax,
				},
			}))
			console.log('AFTER')

			goToNext()
		}
	}

	onMount(async () => {
		await handleSearch()
	})
</script>

<div class="select-container">
	<div class="book-trip-layout">
		<div class="journey">
			<div class="results-container">
				{#if schedule}
					<h1 class="heading">Select outbound journey</h1>
					{#if schedule.outbound.length === 0}
						<Loading progress={true} />
						<div class="white-card" />
					{:else}
						{#each schedule.outbound as outbound}
							<TimeSlot
								bind:selected
								schedule={outbound}
								journey={schedule.outbound}
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
									journey={schedule.inbound}
									type="inbound"
								/>
							{/each}
						{/if}
					{/if}
				{/if}
			</div>
			<button class="next" on:click={addProduct}>Next</button>
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
