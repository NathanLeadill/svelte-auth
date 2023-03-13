<script lang="ts">
	import Footer from '../(app)/_components/footer.svelte'
	let expanded = false
	$: outerWidth = 0
</script>

<svelte:window bind:outerWidth />
<div>
	<header>
		<nav>
			<ul class="header-items-container">
				<li class="header-item header-logo">
					<a href="/"
						><img class="logo" src="/images/ragusa-logo.png" alt="logo" /></a
					>
				</li>
				<div class="grow" />
				<li class="header-item">
					<a href="/#book-trip">
						<img src="/images/icons/circle-cross.svg" alt="cancel login" />
					</a>
				</li>
			</ul>
		</nav>
	</header>
	<div class="container">
		<slot />
	</div>
	<Footer />
</div>

<style>
	/* @TODO MOVE TO GLOBAL LAYOUT... */
	:global(body) {
		font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
			'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif,
			'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol',
			'Noto Color Emoji';
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
	header {
		position: fixed;
		z-index: 999;
		background: transparent;
		width: 100%;
		padding: 50px 0;
	}

	.header-items-container {
		margin-bottom: 2rem;
		padding: 0;
		list-style: none;
		display: flex;
		align-items: center;
		width: 90%;
		margin: 0 auto;
		gap: 25px;
	}

	.header-item {
		display: inline-block;
		margin-right: 1rem;
		text-decoration: none;
		position: relative;
		text-align: center;
	}

	.header-item a {
		text-decoration: none;
		color: #fff;
		font-size: 18px;
		font-weight: 500;
	}

	.header-item :global(.signedInText p) {
		color: #fff;
	}

	.header-item :global(.user-signed-in-icon) {
		filter: invert(99%) sepia(0%) saturate(1656%) hue-rotate(135deg)
			brightness(118%) contrast(100%);
	}

	.header-item button a {
		color: white;
	}

	.grow {
		flex-grow: 1;
	}

	@media only screen and (max-width: 720px) {
		header {
			position: fixed;
			width: 100%;
			top: 0;
			padding: 0;
		}
		.header-items-container {
			padding: 20px 0;
			position: relative;
		}
		.header-logo {
			display: flex;
			flex-grow: 1;
		}
	}
</style>
