<script lang="ts">
	import { bookingState } from '$lib/utils/stores'
	import PassengerDetailsForm from './_components/passenger-details-form.svelte'

	const pDetails = {}
	let passengerDetails = [{}]
	export let selected
	console.log('Selected', $bookingState)

	const passengerCount = $bookingState.journey.outbound.passengers.length
</script>

<section class="test">
	<!-- <DetForm /> -->
	{passengerCount}
	{#each Array(passengerCount) as _, i (i)}
		<PassengerDetailsForm
			number={i}
			passenger={$bookingState.journey.outbound.passengers[i]}
		/>
	{/each}
	<!-- <PassengerDetailsForm number={i} />
	 {/each} -->
	<!-- <PassengerDetailsForm
		type={pDetails}
		bind:details={passengerDetails[i]}
		number={0}
		expanded={true}
	/> -->
</section>

<style>
	.test {
		margin-top: 50px;
	}
</style>
