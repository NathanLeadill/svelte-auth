<div class="heading-container">
	<div class="page-heading">
		<div class="container">
			<slot />
		</div>
	</div>
</div>

<style>
	.heading-container {
		height: 250px;
	}
	.page-heading {
		background: var(--snowfall-blue);
		padding: 110px 0 20px;
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		z-index: 99;
	}

	.page-heading :global(h1) {
		margin: 20px 0 30px;
		height: 50px;
	}

	@media only screen and (max-width: 720px) {
		.heading-container {
			height: 232px;
			margin-bottom: 35px;
		}
	}
</style>
