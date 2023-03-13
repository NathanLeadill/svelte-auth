<script lang="ts">
	import About from './_components/about.svelte'
	import DiscoverRagusa from './_components/discover-ragusa.svelte'
	import ExploreDestinations from './_components/explore-destinations.svelte'
	import Footer from './_components/footer.svelte'
	import Hero from './_components/hero.svelte'
	import WhyBook from './_components/why-book.svelte'

	let expanded = false
	$: outerWidth = 0
</script>

<svelte:window bind:outerWidth />

<div class="main">
	<Hero />
	<div class="container homepage-sections">
		<ExploreDestinations />
		<DiscoverRagusa />
		<About />
		<WhyBook />
	</div>
</div>

<Footer />

<style>
	:global(body) {
		font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
			'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
			'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
			'Noto Color Emoji';
		/* padding: 0 1rem 1rem 1rem; */
		margin: 0 auto;
		background: #f1f1f1;
		color: #333;
	}
	:global(li),
	:global(p) {
		line-height: 1.5rem;
	}
	:global(a) {
		font-weight: 500;
	}
	:global(hr) {
		border: 1px solid #ddd;
	}
	:global(iframe) {
		background: #ccc;
		border: 1px solid #ccc;
		height: 10rem;
		width: 100%;
		border-radius: 0.5rem;
		filter: invert(1);
	}
	.main {
		overflow: hidden;
	}

	:global(nav .header-items-container > .header-item.header-item > a) {
		color: black;
	}

	.homepage-sections {
		flex-direction: column;
	}

	@media only screen and (max-width: 720px) {
	}
</style>
