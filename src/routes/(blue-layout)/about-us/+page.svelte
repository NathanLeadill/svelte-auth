<script lang="ts">
	import BlueHeadingSection from '../_components/blue-heading-section.svelte'
	import AboutRagusa from './_components/about-ragusa.svelte'

	let active = 'about'
</script>

<div class="page-layout">
	<BlueHeadingSection>
		<h1>About us</h1>
	</BlueHeadingSection>
	<!-- <div class="body"> -->
	<div class="about-us-heading">
		<div
			class:active={active === 'about'}
			id="about"
			class="heading-item"
			on:click={() => {
				active = 'about'
			}}
		>
			<p class="heading-label">
				About <span class="italic">Ragusa xpress</span>
			</p>
		</div>
		<div
			id="why"
			class:active={active === 'why'}
			class="heading-item"
			on:click={() => {
				active = 'why'
			}}
		>
			<p class="heading-label">Why <span class="italic">choose use</span></p>
		</div>
	</div>
	{#if active === 'about'}
		<AboutRagusa />
	{:else}
		<p>Awaiting designs from alex</p>
	{/if}
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

	.about-us-heading {
		display: flex;
		flex-direction: row;
		gap: 150px;
		justify-content: center;
		margin: 10px auto 60px;
	}

	.heading-label {
		font-family: 'Playfair Display';
		font-style: normal;
		font-weight: 600;
		font-size: 45px;
		line-height: 36px;
		text-align: center;
		color: #000000;
		line-height: 65px;
		opacity: 0.5;
	}

	.heading-item:hover {
		cursor: pointer;
	}

	.heading-item:hover p {
		opacity: 1;
	}

	.heading-item.active .heading-label {
		opacity: 1;
	}

	span.italic {
		display: block;
		font-style: italic;
	}

	@media only screen and (max-width: 768px) {
		.description::after {
			content: '';
		}
		.about-us-heading .heading-item {
			font-size: 20px;
		}
	}
</style>
