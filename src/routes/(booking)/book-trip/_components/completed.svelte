<script lang="ts">
	import Loading from '$lib/components/loading.svelte'
	import { bookTrip } from '$lib/utils/stores'

	const qrCode = fetchQRCode()

	async function fetchQRCode() {
		const response = await fetch(
			`/api/payment/verify/${$bookTrip.state.token}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					id: $bookTrip.token,
				}),
			}
		)
		const res = await response.json()
		return res
	}
</script>

<div class="container">
	<div class="completed-box">
		<h1>Booking confirmed</h1>
		<p>
			Thank you for choosing Ragusa Xpress. You’ll recieve your travel details
			and confirmation via email and SMS.
		</p>
		{#await qrCode}
			<Loading />
		{:then data}
			<img src={`data:image/png;base64, ${data}`} alt="QR Code" />
		{/await}
		<p>
			You will need to present this code when boarding the ferry. <a
				href="/download">Click here to download it now.</a
			>
		</p>
		<button>Return home</button>
	</div>
</div>

<style>
	h1 {
		font-family: 'Playfair Display';
		font-style: normal;
		font-weight: 400;
		font-size: 50px;
		line-height: 99px;
		text-align: center;
		color: #000000;
	}
	p {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 400;
		font-size: 18px;
		line-height: 30px;
		text-align: center;
		color: #000000;
	}
	button {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 600;
		font-size: 16px;
		line-height: 20px;
		text-align: center;
		color: #ffffff;
	}
	.completed-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
</style>
