<script lang="ts">
	export let backgroundText = false
</script>

<div class="auth-template" style="content: '{backgroundText}'">
	<div class="header">
		<slot name="title">404</slot>
	</div>
	<div class="description">
		<slot name="description">Page not found</slot>
	</div>
	<div class="auth-template-container">
		<slot name="form" />
		<slot name="status" />
		<slot name="footer" />
	</div>
</div>

<style>
	.auth-template {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 100%;
	}

	.auth-template::after {
		content: 'Ragusa';
		font-family: 'Playfair Display';
		font-size: 530px;
		font-weight: 600;
		color: rgba(204, 201, 211, 0.14);
		line-height: 90px;
		margin: 0;
		position: absolute;
		top: 225px;
		left: -420px;
		text-transform: uppercase;
		z-index: -1;
	}

	.auth-template .auth-template-container {
		border: 0.5px solid #c7c7c7;
		border-radius: 16px;
		width: 80%;
		background: #fff;
		z-index: 9;
	}

	.auth-template .header {
		font-family: 'Playfair Display';

		font-weight: 600;
		color: #000;
		line-height: 60px;
		margin: 0;
		padding-top: 50px;
	}

	.header > :global(h1) {
		font-size: 40px;
		font-weight: 600;
	}

	.auth-template .description {
		font-size: 18px;
		line-height: 32px;
		margin: 0 0 60px 0;
		font-family: 'Montserrat';
		font-weight: 400;
		font-size: 18px;
		color: black;
	}

	.description > :global(p) {
		margin: 0;
	}
	.auth-template-container > :global(form) {
		width: 72%;
		margin: 48px auto 0;
		box-sizing: border-box;
	}

	.auth-template-container > :global(form > label) {
		font-family: 'Montserrat';
		font-size: 16px;
		font-weight: 700;
		color: #000;
		line-height: 24px;
		margin-bottom: 5px;
		display: block;
	}

	.auth-template-container > :global(form) > :global(button) {
		width: 264px;
		margin: 34px auto 0;
		display: block;
	}

	:global(input) {
		width: 95%;
		margin-bottom: 38px;
	}
	.header {
		margin-bottom: 0;
	}

	/* Create media queries */
	@media only screen and (max-width: 768px) {
		.auth-template::after {
			content: '';
			display: none;
		}
		.header {
			padding: 0;
		}
		.header :global(h1) {
			font-size: 40px;
			line-height: 51px;
			text-align: center;
		}
		.auth-template .description {
			margin-bottom: 28px;
		}

		.auth-template .auth-template-container {
			width: 100%;
			position: relative;
			display: flex;
			flex-direction: column;
		}
		.auth-template-container > :global(form) {
			margin: 0;
			padding: 22px;
			width: 100%;
			display: flex;
			flex-direction: column;
		}

		.auth-template-container > :global(form button) {
			margin-top: 0;
			width: 100%;
			height: 50px;
		}
		.auth-template-container > :global(form .text-field.text-field) {
			/* padding: 0; */
			width: auto;
		}
	}
</style>
