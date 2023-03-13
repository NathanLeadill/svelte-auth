<script lang="ts">
	const places = [
		{
			name: 'Ragusa',
			title: 'Evening Views',
			description:
				'Arriving at Ragusa Ibla in the evening is a magical experience.',
			price: 5000,
			image: 'images/ragusa-card-background-1.png',
		},
		{
			name: 'Ragusa',
			title: 'Ragusa Ibla',
			description: 'Arriving at Ragusa Evening town will have context in here',
			price: 5000,
			image: '/images/ragusa-ibla.png',
		},
		{
			name: 'Ragusa',
			title: 'The beaches',
			description:
				'The beach of Punta Secca, perhaps stop for an aperitif next ',
			price: 5000,
			image: '/images/ragusa-beach.jpeg',
		},
	]
	let outerWidth: number
</script>

<svelte:window bind:outerWidth />

<div class="discover-ragusa">
	<div class="discover">
		<h4 class="discover-heading">
			Discover <br /> <span class="ragusa">Ragusa</span>
		</h4>
		<p class="discover-body">
			Lorem ipsum dolor sit amet, conse ctetur adipiscing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna dolor sit amet, co
		</p>
		{#if outerWidth > 768}
			<button class="find-prices">Find prices</button>
		{/if}
	</div>

	<div class="cards">
		{#each places as place}
			<div class="card ragusa-1" style="background-image: url({place.image})">
				<div class="card-header">
					<img src="/images/icons/ragusa-location-logo.png" alt="Ragusa" />
					<p class="location-tag">Ragusa</p>
				</div>

				<div class="card-body">
					<span class="card-heading">Ragusa Ibla</span>
					<p class="card-content">
						Arriving at Ragusa Ibla will have context in here
					</p>
				</div>

				<div class="card-footer">
					<button class="book-now">Book now</button>
					<div class="price-bubble">£5,000pp</div>
				</div>
			</div>
		{/each}

		<!-- <div class="card ragusa-1">
			<div class="card-header">
				<img src="/images/icons/ragusa-location-logo.png" alt="Ragusa" />
				<p class="location-tag">Ragusa</p>
			</div>

			<div class="card-body">
				<span class="card-heading">Ragusa Ibla</span>
				<p class="card-content">Arriving at Ragusa Ibla will have context in here</p>
			</div>

			<div class="card-footer">
				<button class="book-now">Book now</button>
				<div class="price-bubble">£5,000</div>
			</div>
		</div>

		<div class="card ragusa-1">
			<div class="card-header">
				<img src="/images/icons/ragusa-location-logo.png" alt="Ragusa" />
				<p class="location-tag">Ragusa</p>
			</div>

			<div class="card-body">
				<span class="card-heading">Ragusa Ibla</span>
				<p class="card-content">Arriving at Ragusa Ibla will have context in here</p>
			</div>

			<div class="card-footer">
				<button class="book-now">Book now</button>
				<div class="price-bubble">£5,000</div>
			</div>
		</div>
		<div class="card ragusa-1">
			<div class="card-header">
				<img src="/images/icons/ragusa-location-logo.png" alt="Ragusa" />
				<p class="location-tag">Ragusa</p>
			</div>

			<div class="card-body">
				<span class="card-heading">Ragusa Ibla</span>
				<p class="card-content">Arriving at Ragusa Ibla will have context in here</p>
			</div>

			<div class="card-footer">
				<button class="book-now">Book now</button>
				<div class="price-bubble">£5,000</div>
			</div>
		</div> -->
	</div>
	{#if outerWidth < 768}
		<button class="find-prices">Search prices</button>
	{/if}
</div>

<style>
	.discover-ragusa {
		display: flex;
		background-color: #f6f4f0;
		width: 100%;
		padding: 128px 80px;
		gap: 85px;
		overflow: hidden;
	}

	.discover {
		padding: 50px 0 0 200px;
		min-width: 255px;
	}

	.discover-heading {
		color: rgba(0, 0, 0, 0.5);
		font-family: 'Playfair Display';
		font-size: 60px;
		font-weight: 400;
		margin-bottom: 0;
	}

	.ragusa {
		color: black;
		text-transform: uppercase;
	}

	.discover-body {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 400;
		font-size: 18px;
		line-height: 30px;
		display: flex;
		align-items: center;
		color: #000000;
	}

	.find-prices {
		background: transparent;
		border: 1px solid grey;
		border-radius: 5px;
		padding: 15px 50px;
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 500;
		font-size: 18px;
		line-height: 24px;
		text-align: center;
		color: var(--snowfall-blue);
	}

	.cards {
		display: flex;
		flex-direction: row;
		gap: 2rem;
		overflow-x: scroll;
		flex-basis: 85%;
	}

	.card {
		padding: 2rem;
		background-repeat: no-repeat;
		background-size: cover;
		height: 30rem;
		display: flex;
		flex-direction: column;
		min-width: 300px;
	}

	.card-header {
		display: flex;
		gap: 1.25rem;
		flex-grow: 1;
	}

	.card-header img {
		width: 50px;
		height: 50px;
	}

	.location-tag {
		color: white;
		font-family: 'Montserrat';
		font-weight: 700;
		font-size: 12px;
	}

	.card-body {
		color: white;
	}

	.card-heading {
		font-family: 'Montserrat';
		font-size: 26px;
		font-weight: 500;
		margin-bottom: 0;
	}

	.card-content {
		font-family: 'Montserrat';
		font-size: 16px;
		font-weight: 400;
	}

	.card-footer {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.book-now {
		background: transparent;
		border: 1px solid white;
		border-radius: 10px;
		font-size: 1rem;
		padding: 0.65rem 1rem;
	}

	.price-bubble {
		background: rgba(255, 255, 255, 0.4);
		backdrop-filter: blur(2px);
		border-radius: 49px;
		padding: 0.75rem 1rem;
		color: white;
		font-family: 'Open Sans';
		font-style: normal;
		font-weight: 600;
		font-size: 14px;
	}

	/* Create media queries */
	@media only screen and (max-width: 1280px) {
		.discover-ragusa {
			flex-direction: column;
			padding: 0;
			gap: 20px;
		}

		.discover {
			padding: 0;
		}

		.discover-heading {
			font-family: 'Playfair Display';
			font-style: normal;
			font-weight: 400;
			font-size: 34px;
			line-height: 43px;
			color: rgba(0, 0, 0, 0.5);
			width: 100%;
		}

		.discover-heading br {
			display: none;
		}

		.discover-body {
			font-family: 'Montserrat';
			font-style: normal;
			font-weight: 400;
			font-size: 18px;
			line-height: 27px;
			color: #000000;
		}
		.cards {
			gap: 16px;
		}
		.find-prices {
			background: #2c304e;
			color: white;
			font-weight: 500;
			font-size: 20px;
			line-height: 24px;
			text-align: center;
		}
	}
</style>
