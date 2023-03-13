<script lang="ts">
</script>

<!-- <div class="container"> -->
<div class="why-book-container">
	<h4 class="why-book-heading">Book your next escape with Ragusa</h4>
	<p class="why-book-tag">Why Ragusa express?</p>

	<div class="why-book-list">
		<div class="why-book-item">
			<img src="images/icons/app_shortcut.png" alt="Why book with Ragusa Express?" />
			<p class="why-book-item-heading">Book with Confidence</p>
			<p class="why-book-item-tag">
				rem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Ut enim
			</p>
		</div>
		<div class="why-book-item">
			<img src="images/icons/garage.png" alt="Why book with Ragusa Express?" />
			<p class="why-book-item-heading">Travel on your terms</p>
			<p class="why-book-item-tag">
				rem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Ut enim
			</p>
		</div>
		<div class="why-book-item">
			<img src="images/icons/medical_mask.png" alt="Why book with Ragusa Express?" />
			<p class="why-book-item-heading">Stay protected</p>
			<p class="why-book-item-tag">
				rem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Ut enim
			</p>
		</div>
	</div>
</div>

<!-- </div> -->
<style>
	.why-book-container {
		display: flex;
		align-items: center;
		flex-direction: column;
		padding: 120px 0 50px;
		position: relative;
	}

	.why-book-container::before {
		content: 'RAGUSA';
		position: absolute;
		top: -125px;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		font-family: 'Playfair Display';
		font-style: normal;
		font-weight: 900;
		font-size: 500px;
		line-height: 36px;
		display: flex;
		align-items: center;
		color: rgba(204, 201, 211, 0.36);
		opacity: 0.3;
	}

	.why-book-heading {
		font-family: 'Inter';
		font-style: normal;
		font-weight: 500;
		font-size: 20px;
		line-height: 19px;
		text-align: center;
		letter-spacing: 0.1em;
		color: #000000;
	}

	.why-book-tag {
		font-family: 'Playfair Display';
		font-weight: 600;
		font-size: 64px;
		margin-top: 2.5rem;
	}

	.why-book-list {
		display: flex;
		max-width: 80%;
		text-align: center;
		gap: 136px;
		margin-top: 3.5rem;
	}

	.why-book-item-heading {
		font-family: 'Playfair Display';
		font-weight: 600;
		font-weight: 20px;
		text-transform: uppercase;
	}

	.why-book-item-tag {
		font-family: 'Montserrat';
		font-size: 16px;
		font-weight: 400;
		color: #000;
		line-height: 32px;
	}

	@media only screen and (max-width: 1280px) {
		.why-book-list {
			flex-direction: column;
		}
		.why-book-heading {
			font-family: 'Inter';
			font-style: normal;
			font-weight: 500;
			font-size: 20px;
			line-height: 25px;
			text-align: center;
			letter-spacing: 0.1em;
			color: #000000;
			text-transform: uppercase;
			width: 90%;
		}
		.why-book-tag {
			font-family: 'Playfair Display';
			font-style: normal;
			font-weight: 600;
			font-size: 34px;
			line-height: 36px;
			color: #000000;
		}

		/* @TODO FIX THIS BULLSHIT */
		.why-book-container::before {
			top: -600px;
			left: -150px;
			width: 100%;
			height: 100%;
			z-index: -1;
			font-size: 400px;
			line-height: 36px;
			opacity: 0.35;
		}
	}

	@media only screen and (max-width: 780px) {
		.why-book-container {
			padding-top: 100px;
		}
		.why-book-container::before {
			font-size: 250px;
		}
		.why-book-heading {
			width: 75%;
		}
		.why-book-tag {
			margin-top: 0;
		}
		.why-book-list {
			max-width: 83%;
			gap: 55px;
		}
		.why-book-item-heading {
			font-size: 20px;
		}
		.why-book-item-tag {
			font-size: 16px;
			width: 100%;
		}
	}
</style>
