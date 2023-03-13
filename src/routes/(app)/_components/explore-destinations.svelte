<script lang="ts">
	import Destination from './destination.svelte';

	const destinations = [
		{
			name: 'Sicily',
			images: ['images/sicily-mountain.jpeg', 'images/sicily-water.webp']
		},
		{
			name: 'Malta',
			images: ['images/malta-harbour.jpeg', 'images/malta-city.webp']
		}
	];
</script>

<div class="explore">
	<h2 class="explore-heading">
		Explore our <br /> <span class="explore-heading--destination">destinations</span>
	</h2>

	<div class="destinations">
		{#each destinations as destination, i}
			<Destination {destination} index={i} />
		{/each}
	</div>
</div>

<style>
	.explore {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 175px 0 75px;
	}

	.explore-heading {
		font-family: 'Playfair Display';
		font-size: 64px;
		font-weight: 600;
		line-height: 5rem;
		color: #000;
		margin-top: 2rem;
		margin-bottom: 1rem;
	}

	.explore-heading--destination {
		font-style: italic;
		font-weight: 400;
	}

	.destinations {
		margin-top: 5rem;
		display: flex;
		gap: 10rem;
	}

	/* Create media queries */
	@media only screen and (max-width: 768px) {
		.explore {
			/* padding: 100px 0 50px; */
			padding: 0;
			align-items: unset;
			width: 90%;
		}

		.explore-heading {
			font-size: 48px;
			line-height: 4rem;
			margin-top: 300px;
			text-align: center;
		}

		.destinations {
			margin-top: 3rem;
			gap: 5rem;
			flex-direction: column;
		}
		.destination .cards :global(.card.card) {
			width: 325px;
			height: 400px;
		}
	}
</style>
