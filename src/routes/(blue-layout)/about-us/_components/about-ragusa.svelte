<div class="who-we-are-container">
	<div class="images">
		<img src="/images/road-village.png" alt="who we are" />
	</div>
	<div class="content">
		<h4 class="sub-heading">Who we are</h4>
		<p class="content-body">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
			tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
			veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
			commodo consequat.
		</p>
	</div>
</div>
<div class="description">
	<h4 class="sub-heading">
		Travel made easy, <br />with unforgettable experiences
	</h4>
	<p class="content-body">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
		tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
		quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
		consequat. Sed ut perspiciatis unde omnis iste natus error sit voluptatem
		accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
		illo inventore veritatis et quasi architecto beatae vitae dicta sunt
		explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit
		aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem
		sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia do
	</p>
</div>
<!-- </div> -->
<div class="footer-container">
	<img
		class="footer-image"
		src="/images/houses-red.png"
		alt="Red house image"
	/>
</div>

<style>
	.footer-image {
		position: absolute;
		width: 100%;
		left: 0%;
	}
	.who-we-are-container {
		display: flex;
		gap: 200px;
	}
	.who-we-are-container .content {
		text-align: start;
	}

	.who-we-are-container .content-body {
		width: 67%;
	}
	.who-we-are-container .images img {
		height: 600px;
	}

	.sub-heading {
		font-family: 'Playfair Display';
		font-style: normal;
		font-weight: 600;
		font-size: 40px;
		line-height: 95px;

		color: #000000;
	}

	.content-body {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 400;
		font-size: 22px;
		line-height: 38px;
		color: #000000;
	}

	.description {
		width: 50%;
		margin: 200px auto 75px;
		position: relative;
	}

	.description::after {
		content: 'Ragusa';
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		top: -50%;
		left: -75%;
		font-family: 'Playfair Display';
		font-style: normal;
		font-weight: 900;
		font-size: 500px;
		line-height: 36px;
		text-transform: uppercase;
		display: flex;
		align-items: center;

		color: rgba(204, 201, 211, 0.15);
	}

	.description .sub-heading {
		line-height: 60px;
		margin-bottom: 25px;
	}

	@media only screen and (max-width: 768px) {
		.description::after {
			content: '';
		}
	}
</style>
