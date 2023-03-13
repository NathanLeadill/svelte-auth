<script lang="ts">
	import BlueHeadingSection from '../_components/blue-heading-section.svelte'
</script>

<div class="page-layout">
	<BlueHeadingSection>
		<h1>Our ports</h1>
	</BlueHeadingSection>
	<div class="ports">
		<div class="port">
			<div class="port-image">
				<img src="/images/ragusa-boats.png" alt="Ragusa" />
			</div>
			<div class="port-content">
				<div class="port-header">Ragusa</div>
				<div class="port-body">
					Ragusa Airport is unique as it has a Port at 500-800 m walking
					distance from the airport terminal. At the harbour it´s a nice beach
					and also a beach bar and a restaurant so it´s very convenient to spend
					some time here after your flight or before you are flying. Taking our
					vehicle direct from the airport saves you a lot of time compare to
					travelling by bus or taxi to Split and wait for your vehicle to the
					Islands.
				</div>
			</div>
		</div>
		<div class="port reverse">
			<div class="port-image">
				<img src="/images/ragusa-boats.png" alt="Ragusa" />
			</div>
			<div class="port-content">
				<div class="port-header">Ragusa</div>
				<div class="port-body">
					Ragusa Airport is unique as it has a Port at 500-800 m walking
					distance from the airport terminal. At the harbour it´s a nice beach
					and also a beach bar and a restaurant so it´s very convenient to spend
					some time here after your flight or before you are flying. Taking our
					vehicle direct from the airport saves you a lot of time compare to
					travelling by bus or taxi to Split and wait for your vehicle to the
					Islands.
				</div>
			</div>
		</div>
		<a class="book-trip-link" href="/book-trip">
			<button class="trip-button"> Book a Trip </button>
		</a>
	</div>
</div>

<style>
	.page-layout {
		margin-bottom: 100px;
	}
	h1 {
		font-family: 'Playfair Display';
		font-style: normal;
		font-weight: 400;
		font-size: 54px;
		line-height: 50px;

		display: flex;
		align-items: center;
		color: #ffffff;
	}
	.ports {
		padding: 25px 0 100px;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 85%;
		margin: 0 auto;
	}
	.port {
		width: 100%;
		margin: 20px 0;
		padding: 20px;
		border-radius: 10px;
		display: flex;
		gap: 90px;
	}

	.port.reverse {
		flex-direction: row-reverse;
	}

	.port-header {
		flex-basis: 60%;
		font-family: 'Playfair Display';
		font-style: normal;
		font-weight: 600;
		font-size: 40px;
		line-height: 95px;
		/* identical to box height, or 238% */

		color: #000000;
	}

	.port-body {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 400;
		font-size: 20px;
		line-height: 34px;
		color: #000000;
	}

	.trip-button {
		padding: 15px 60px;
	}

	.trip-button a {
		color: white;
		text-decoration: none;
	}

	@media only screen and (max-width: 768px) {
		h1 {
			margin: 0;
		}
		.ports {
			padding: 0;
			width: 95%;
		}
		.port {
			flex-direction: column;
			gap: 0;
		}
		.port-header {
			font-size: 44px;
			margin: 0;
		}
		.port-body {
			font-size: 20px;
			line-height: 35px;
			font-weight: 400;
		}
		.port.reverse {
			flex-direction: column;
		}
		.port-image img {
			width: 100%;
		}
		.book-trip-link,
		.trip-button {
			width: 100%;
		}
	}
</style>
