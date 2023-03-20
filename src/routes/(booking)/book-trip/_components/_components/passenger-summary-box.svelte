<script lang="ts">
	import type { PassengerDetailsType } from '$lib/types/account'

	export let passenger: PassengerDetailsType
</script>

<div class="passenger-box">
	<span class="name">{passenger.firstname} {passenger.lastname}</span>
	<p class="ticket-type">Adult</p>
	<p class="email">{passenger.email}</p>
	<p class="mobile">{passenger.mobile}</p>
</div>

<style>
	.passenger-box {
		background: #ffffff;
		border: 0.5px solid #c7c7c7;
		border-radius: 16px;
		flex-basis: 33%;
		padding: 34px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		font-family: 'Montserrat';
	}
	.passenger-box .name {
		font-weight: 600;
		font-size: 18px;
	}
	.passenger-box p {
		margin: 0;
	}
</style>
