<script>
	import SignInMenu from './sign-in-menu.svelte'

	export let expanded = false
	export let type = 'black'
	$: outerWidth = 0
</script>

<svelte:window bind:outerWidth />

<header class:white={type === 'white'} class:black={type === 'black'}>
	<nav>
		<ul class="header-items-container">
			<li class="header-item header-logo">
				<a href="/">
					{#if type === 'white'}
						<img class="logo" src="/images/ragusa-logo-white.svg" alt="logo" />
					{:else}
						<img class="logo" src="/images/ragusa-logo.png" alt="logo" />
					{/if}
				</a>
			</li>
			{#if outerWidth > 768}
				<div class="items-list">
					<li class="header-item"><a href="/">Home</a></li>
					<li class="header-item"><a href="/timetable">Timetable</a></li>
					<li class="header-item">
						<a href="/explore/sicily">Explore Sicily</a>
					</li>
					<li class="header-item">
						<a href="/explore/malta">Explore Malta</a>
					</li>
					<div class="grow" />
					<li class="header-item"><SignInMenu /></li>
					<li class="header-item">
						<a href="/#book-trip"
							><button class="book-trip-button">Book a trip</button></a
						>
					</li>
				</div>
			{:else}
				<li class="header-item logo-container">
					<button on:click={() => (expanded = !expanded)}>
						<img src="/images/icons/menu.png" alt="menu icon" />
					</button>
				</li>
				{#if expanded}
					<div class="mobile-menu">
						<li class="header-item"><a href="/">Home</a></li>
						<li class="header-item"><a href="/timetable">Timetable</a></li>
						<li class="header-item">
							<a href="/explore/sicily">Explore Sicily</a>
						</li>
						<li class="header-item">
							<a href="/explore/malta">Explore Malta</a>
						</li>
						<div class="grow" />
						<li class="header-item"><SignInMenu /></li>
						<li class="header-item">
							<a href="/#book-trip"
								><button class="book-trip-button">Book a trip</button></a
							>
						</li>
					</div>
				{/if}
			{/if}
		</ul>
	</nav>
</header>

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
	header {
		position: fixed;
		z-index: 999;
		background: transparent;
		width: 100%;
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

	.items-list {
		margin-bottom: 2rem;
		padding: 0;
		list-style: none;
		display: flex;
		align-items: center;
		width: 90%;
		margin: 0 auto;
		padding: 20px 0 20px 65px;
		gap: 25px;
	}
	.header-item {
		display: inline-block;
		margin-right: 1rem;
		text-decoration: none;
		position: relative;
		text-align: center;
	}

	.black .header-item a {
		text-decoration: none;
		color: #000;
		font-size: 18px;
		font-weight: 500;
	}

	.black .header-item :global(.signedInText p) {
		color: #000;
	}

	.white .header-item a {
		text-decoration: none;
		color: #fff;
		font-size: 18px;
		font-weight: 500;
	}

	.white .header-item :global(.signedInText p) {
		color: #fff;
	}

	.white .header-item :global(.user-signed-in-icon) {
		filter: invert(99%) sepia(0%) saturate(1656%) hue-rotate(135deg)
			brightness(118%) contrast(100%);
	}

	.white .header-item button a {
		color: white;
	}

	.grow {
		flex-grow: 1;
	}

	.white .book-trip-button {
		background: white;
	}

	.black .book-trip-button {
		background: var(--snowfall-blue);
		color: white;
	}

	.book-trip-button {
		color: #333;
		font-family: 'Montserrat';
		font-weight: 600;
		border-radius: 8px;
		padding: 14px 32px;
		font-size: 1rem;
		font-weight: 500;
		cursor: pointer;
	}

	.page {
		padding-top: 100px;
	}

	@media only screen and (max-width: 720px) {
		header {
			position: fixed;
			width: 100%;
			top: 0;
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

		.mobile-menu .header-item a,
		.mobile-menu .header-item :global(.signedInText p) {
			margin: 0;
			color: var(--snowfall-blue);
		}

		.mobile-menu .header-item a {
			margin: 0;
		}

		.mobile-menu .book-trip-button {
			background: var(--snowfall-blue);
			color: #fff;
		}
		.items-list {
			display: none;
		}
	}
</style>
