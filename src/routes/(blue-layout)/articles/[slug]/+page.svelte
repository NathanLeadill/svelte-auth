<script lang="ts">
	import { page } from '$app/stores'
	import BlueHeadingSection from '../../_components/blue-heading-section.svelte'
</script>

<div class="page-layout">
	<BlueHeadingSection>
		<div class="article-heading--content">
			<h1>{$page.params.slug}</h1>
			<p class="article-tag">
				Intro text .... rem ipsum dolor sit amet, consectetur adipiscing elit,
				sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
				enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
				aliquip ex ea
			</p>
		</div>
	</BlueHeadingSection>

	<div class="onboard-services">
		<div class="article-content">
			<span class="article-short-description">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna dolor sit amet, consectetur
				adipiscing elit, sed Lorem ipsum dolor sit amet, consectetur adipiscing
				elit, sed do eiusmod tempor incididunt ut labore et dolore magna dolor
				sit amet, consectetur adipiscing elit, sed d
			</span>
			<div class="article-image-container">
				<img src="/images/sicily-island.png" alt="" align="start" />
				<p>
					Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
					eiusmod tempor incididunt ut labore et dolore magna dolor sit amet,
					consectetur adipiscing elit, sed Lorem ipsum dolor sit amet,
					consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
					labore et dolore magna dolor sit amet, consectetur adipiscing elit,
					sed d
				</p>
			</div>
			<p class="article-main-content">
				Sed ut perspiciatis unde omnis iste natus error sit voluptatem
				accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab
				illo inventore veritatis et quasi architecto beatae vitae dicta sunt
				explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut
				odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
				voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum
				quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam
				eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat
				voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam
				corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur?
				Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse
				quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
				voluptas nulla pariatur? <br /><br />Sed ut perspiciatis unde omnis iste
				natus error sit voluptatem accusantium doloremque laudantium, totam rem
				aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto
				beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
				voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni
				dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
				est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
				sed quia non numquam eius modi tempora incidunt ut labore et dolore
				magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
				nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
				aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit
				qui in ea voluptate velit esse quam nihil molestiae consequatur, vel
				illum qui dolorem eum fugiat quo voluptas nulla pariatur?
			</p>
		</div>
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

	.article-content {
		display: flex;
		justify-content: center;
		max-width: 1020px;
		align-items: center;
		margin: 0 auto;
		flex-direction: column;
	}

	.article-content .article-short-description {
		display: block;
		font-family: 'Montserrat';
		font-weight: 500;
		font-size: 24px;
		color: #000;
		width: 100%;
		line-height: 44px;
		margin: 100px 0 50px;
	}

	.article-image-container {
		display: flex;
		align-items: center;
		flex-direction: row;
	}

	.article-image-container p {
		font-family: 'Montserrat';
		font-weight: 400;
		font-size: 24px;
		color: #000;
		line-height: 44px;
		padding-left: 88px;
		width: 435px;
	}

	.article-main-content {
		margin-top: 82px;
		font-family: 'Montserrat';
		font-weight: 400;
		font-size: 24px;
		color: #000;
		line-height: 44px;
	}

	.article-heading--content {
		display: flex;
		flex-direction: row;
		gap: 120px;
	}
	.article-heading--content h1 {
		color: #fff;
		font-size: 54px;
		font-family: 'Playfair Display';
		font-weight: 400;
		margin: 0;
		padding: 16px;
		width: 50%;
		flex-basis: 35%;
	}
	.article-heading--content p {
		color: white;
		font-family: 'Montserrat';
		width: 30%;
		font-size: 20px;
	}

	@media only screen and (max-width: 768px) {
		:global(.heading-container .page-heading) {
			padding-top: 75px;
		}

		.article-content .article-short-description {
			margin-top: 25px;
		}

		.article-image-container {
			display: block;
		}

		.article-image-container img {
			width: 100%;
		}
		.article-image-container p {
			padding-left: 0;
			width: 100%;
		}

		.article-short-description {
			line-height: 40px;
		}

		.article-heading--content {
			flex-direction: column;
			align-items: center;
			gap: 0;
		}

		.article-heading--content h1 {
			justify-content: flex-start;
			width: 100%;
			padding: 10px 0 0;
			font-size: 40px;
			line-height: 50px;
		}

		.article-heading--content p {
			width: 100%;
			text-align: start;
			font-size: 12px;
			line-height: 18px;
		}
	}
</style>
