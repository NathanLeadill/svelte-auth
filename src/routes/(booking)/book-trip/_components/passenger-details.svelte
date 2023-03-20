<script lang="ts">
	import { bookingState } from '$lib/utils/stores'
	import PassengerDetailsForm from './_components/passenger-details-form.svelte'

	export let selected
	export let goToNext: () => void
	const passengerCount = $bookingState.journey.outbound.passengers.length
	$: passengerDetailsValid = $bookingState.journey.outbound.passengers.every(
		(el) => {
			if (el.firstname && el.firstname.length > 0) {
				return true
			}
		}
	)
	function next() {
		goToNext()
	}
</script>

<section class="passenger-forms">
	{#each Array(passengerCount) as _, i (i)}
		<PassengerDetailsForm
			number={i}
			passenger={$bookingState.journey.outbound.passengers[i]}
		/>
	{/each}

	<button disabled={!passengerDetailsValid} on:click={next}>Next</button>
</section>

<style>
	.passenger-forms {
		margin-top: 50px;
		display: flex;
		flex-direction: column;
		gap: 50px;
	}
</style>
