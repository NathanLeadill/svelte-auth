<script lang="ts">
	import type { Destination } from '$lib/types/destination'

	export let destination: Destination
	export let index: number
	// @TODO MOVE TO OBJECT I GUESS
	$: rotateVal = index === 0 ? 2 : 4
	$: leftVal = index === 0 ? 1.5 : 2.5
	$: topVal = index === 0 ? 1.5 : -1.5
</script>

<div class="destination">
	<div class="cards">
		<div class="image-left card">
			<img src={destination.images[0]} alt="city" />
		</div>
		<div
			class="image-right card"
			style="transform: rotate({rotateVal}deg); left: {leftVal}rem; top: {topVal}rem;"
		>
			<img src={destination.images[1]} alt="beach" />
		</div>
	</div>
	<span class="explore-title">
		Explore
		<span class="country-name">{destination.name}</span>
	</span>
	<div class="explore-content">
		Your guide on exploring {destination.name}
	</div>
	<div class="explore-container">
		<div class="bar" />
		<a class="explore-link" href={`/explore/${destination.name.toLowerCase()}`}>
			Discover
		</a>
		<img
			src="/images/icons/discover-arrow.svg"
			class="discover-arrow"
			alt="discover arrow"
		/>
	</div>
</div>

<style>
	.destination {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	.cards {
		position: relative;
	}

	.card {
		width: 375px;
		height: 500px;
	}

	.card img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	.image-right {
		position: absolute;
		top: -1.5rem;
	}

	.explore-title {
		font-family: 'Playfair Display';
		font-size: 60px;
		font-weight: 400;
		line-height: 5rem;
		color: #000;
		margin-top: 2rem;
		margin-bottom: 1rem;
		color: rgba(0, 0, 0, 0.5);
		text-transform: uppercase;
		width: 100%;
	}
	.country-name {
		color: var(--snowfall-blue);
		display: block;
	}
	.explore-content {
		width: 100%;

		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 400;
		font-size: 18px;
		line-height: 32px;

		display: flex;
		align-items: center;
		color: #000000;
	}

	.explore-link {
		font-family: 'Playfair Display';
		font-style: normal;
		font-weight: 600;
		font-size: 24px;
		line-height: 55px;
		padding: 0 10px;
		color: #000000;
		text-decoration: none;
		text-transform: uppercase;
	}

	.explore-container {
		display: flex;
		align-items: center;
		width: 100%;
	}
	.bar {
		height: 2px;
		width: 50px;
		background: black;
		flex-grow: 1;
		margin: 0 30px 0 0;
	}
	.discover-arrow {
		padding-top: 5px;
	}

	@media only screen and (max-width: 768px) {
		.destination {
			align-items: unset;
		}
		.destination .cards :global(.card.card) {
			width: 320px;
			height: 425px;
		}

		.explore-title {
			font-size: 34px;
			line-height: 70px;
			display: flex;
			gap: 10px;
		}
		.explore-content {
			font-size: 18px;
		}
		.explore-container {
			gap: 10px;
		}
		.bar {
			margin-right: 20px;
		}
	}
</style>
