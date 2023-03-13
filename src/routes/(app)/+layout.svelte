<script lang="ts">
	import { page } from '$app/stores'
	import Navigation from '$lib/components/navigation.svelte'

	let expanded = false
	$: outerWidth = 0

	function toggleExpanded() {
		expanded = !expanded
	}
</script>

<svelte:window bind:outerWidth />
<div>
	<Navigation type="black" />
	<div class="page-layout">
		<slot />
	</div>
	<!-- <Footer /> -->
</div>
{#if $page.data.user}
	<pre>
		{JSON.stringify($page.data.user, null, 2)}
	</pre>
{/if}

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
	.page-layout {
		padding-top: 87px;
	}
	@media only screen and (max-width: 720px) {
		header {
			position: fixed;
			width: 100%;
			top: 0;
			background: white;
		}
		.header-items-container {
			padding: 20px 0;
			position: relative;
		}
		.header-logo {
			display: flex;
			flex-grow: 1;
		}

		.logo-container {
			margin-right: 0;
		}

		.logo-container button {
			padding: 0;
		}

		.logo-container img {
			height: 40px;
			margin: 0;
			padding: 0;
		}

		.mobile-menu {
			position: absolute;
			top: 92px;
			left: -20px;
			width: 100%;
			background: white;
			display: flex;
			flex-direction: column;
			padding: 15px 20px;
			border-bottom-left-radius: 20px;
			border-bottom-right-radius: 20px;
		}

		.header-item.logo-container button {
			background: none;
		}

		.mobile-menu .header-item {
			padding: 10px 0;
			display: flex;
			justify-content: center;
		}

		.items-list {
			display: none;
		}

		.page-layout {
			padding-top: 100px;
		}
	}
</style>
