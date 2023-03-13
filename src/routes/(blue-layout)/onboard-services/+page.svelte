<script lang="ts">
	import BlueHeadingSection from '../_components/blue-heading-section.svelte'
</script>

<div class="page-layout">
	<BlueHeadingSection>
		<h1>Onboard services</h1>
	</BlueHeadingSection>
	<div class="onboard-services">
		<p>
			When you are travelling with us, we do our best to make sure your trip is
			as smooth and comfortable as possible. We want you to feel welcomed and
			have everything you need so we go the extra mile to make sure that you
			continue choosing to travel with us,
			<br /><br />
			In addition to everything included in your tickets, we staff our vehicle with
			professional servicemen who are there to make sure you have the best possible
			trip. If you have any questions or are in need of assistance while travelling,
			please reach out to them onboard and they will do their best to help you out.
		</p>
	</div>
</div>

<style>
	h1 {
		font-family: 'Playfair Display';
		font-style: normal;
		font-weight: 400;
		font-size: 54px;
		line-height: 72px;

		display: flex;
		align-items: center;
		color: #ffffff;
	}
	.onboard-services {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.onboard-services p {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 400;
		font-size: 24px;
		line-height: 44px;
		color: #000000;
	}

	@media only screen and (max-width: 768px) {
		h1 {
			margin-bottom: 0;
		}
	}
</style>
