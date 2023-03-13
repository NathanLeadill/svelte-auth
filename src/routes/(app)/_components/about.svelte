<script lang="ts">
	const cards = [
		{
			heading: 'Travel in luxury',
			image: '/images/about-champagne.png',
			tag: 'Make your trip a comfortable on and enjoy our luxury services',
		},
		{
			heading: 'Relax with your dogs',
			image: '/images/about-dog.png',
			tag: 'Travelling with your dog? Enjoy the confort onboard together ',
		},
		{
			heading: 'Dine on board',
			image: '/images/about-seating.png',
			tag: 'Join us onboard without worrying about hunger - we have food ... ',
		},
	]
</script>

<div class="about-container">
	<h4 class="about-heading">
		About <span class="express">Ragusa Express</span>
	</h4>
	<p class="about-tag">A new high speed, reliable ferry service</p>

	<div class="cards">
		{#each cards as card}
			<div class="column">
				<div class="card" style="background-image: url({card.image})">
					<p class="heading">
						<span class="italic"
							>{card.heading.substring(0, card.heading.indexOf(' '))}</span
						>{card.heading.substring(card.heading.indexOf(' ') + 1)}
					</p>
				</div>
				<p class="tag-line">{card.tag}</p>
			</div>
		{/each}
	</div>
	<a href="#book-trip">
		<button class="about-book"> Book a trip</button>
	</a>
</div>

<style>
	.about-container {
		display: flex;
		align-items: center;
		flex-direction: column;
	}

	.about-heading {
		font-family: 'Playfair Display';
		font-size: 64px;
		font-weight: 600;
		line-height: 5rem;
		color: #000;
		margin-top: 4.5rem;
		margin-bottom: 1rem;
		text-align: center;
	}

	.express {
		display: block;
		font-style: italic;
		font-weight: 400;
	}

	.about-tag {
		font-family: 'Montserrat';
		font-size: 16px;
		font-weight: 400;
		color: #636363;
	}

	.about-book {
		background-color: var(--snowfall-blue);
		color: #fff;
		font-family: 'Montserrat';
		font-size: 16px;
		font-weight: 500;
		border: none;
		border-radius: 5px;
		padding: 16px 80px;
		margin-top: 60px;
	}

	.about-book a {
		text-decoration: none;
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 500;
		font-size: 18px;
		line-height: 24px;
		text-align: center;

		color: #ffffff;
	}

	.cards {
		display: flex;
		justify-content: center;
		margin-top: 2rem;
		gap: 80px;
		width: 80%;
	}

	.column {
		/* display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column; */
	}

	.card {
		background-size: cover;
		height: 365px;
	}

	.heading {
		font-family: 'Playfair Display';
		font-size: 32px;
		font-weight: 600;
		color: #fff;
		margin: 0;
		line-height: 40px;
		display: block;
		padding-top: 2rem;
		text-align: center;
	}
	.italic {
		display: block;
		font-style: italic;
		font-weight: 400;
	}

	.tag-line {
		width: 75%;
		margin: 10px 0;
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 26px;
		display: flex;
		align-items: center;
		color: #000000;
	}

	/* Create media queries */
	@media only screen and (max-width: 768px) {
		.about-container a {
			width: 100%;
			text-align: center;
		}
		.about-heading {
			font-size: 34px;
			line-height: 50px;
		}

		.about-tag {
			font-size: 18px;
			margin-bottom: 0;
		}

		.about-book {
			margin-top: 30px;
			padding: 16px 40px;
			width: 80%;
		}

		.about-book a {
			font-size: 16px;
		}

		.cards {
			flex-direction: column;
			gap: 20px;
		}

		.card {
			height: 300px;
		}

		.heading {
			font-size: 24px;
			line-height: 32px;
		}

		.tag-line {
			width: 100%;
			font-size: 14px;
			line-height: 24px;
		}
	}
</style>
