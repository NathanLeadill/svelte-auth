<script lang="ts">
	import { applyAction, enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import TextField from '$lib/components/text-field.svelte'
	import AuthTemplate from '$lib/templates/auth-template.svelte'
	import type { ActionData } from './$types'
	// import AuthLayout from '$lib/layouts/AuthLayout.svelte'

	const data = {
		email: '',
		password: '',
	}
	export let form: ActionData
</script>

<AuthTemplate>
	<h1 slot="title">Welcome back</h1>
	<p slot="description">Please log in to your account</p>
	<form
		class="login-form"
		slot="form"
		action="?/signin"
		method="POST"
		use:enhance={() => {
			return async ({ result }) => {
				invalidateAll()
				await applyAction(result)
			}
		}}
	>
		<label for="email">Email address</label>
		<TextField
			id="email"
			name="email"
			type="email"
			placeholder="Enter your email"
		/>

		<label for="password">Password</label>
		<TextField
			id="password"
			type="password"
			name="password"
			placeholder="Enter your password"
		/>

		<button type="submit">Log in</button>
		<!-- {#if error}
			<p class="error-message">Error: Insert Generic Error Message Here</p>
		{/if} -->
	</form>
	<div class="register-footer" slot="footer">
		<p>Don't have an account? <a href="/register">Register here</a></p>
	</div>
</AuthTemplate>
<p class="forgot">
	<a href="/forgot-password">I have forgotten my details</a>
</p>
>

<style>
	.register-footer {
		margin-top: 43px;
		background-color: #f7f7f7;
		border-bottom-left-radius: 16px;
		border-bottom-right-radius: 16px;
		display: flex;
		justify-content: center;
	}
	.register-footer p {
		margin: 0;
		padding: 30.5px 0;
		font-family: 'Montserrat';
		font-size: 18px;
		color: black;
	}

	p a {
		color: var(--snowfall-blue);
		text-decoration: none;
		font-weight: 700;
	}
	.forgot {
		font-size: 18px;
		font-weight: 400;
		margin: 54px 0 30px 0;
		text-align: center;
		font-family: 'Montserrat';
		font-size: 18px;
	}
	p.forgot a {
		font-weight: 400;
	}
	.error-message {
		color: red;
		font-size: 18px;
		font-weight: 400;
		margin: 54px 0 30px 0;
		text-align: center;
		font-family: 'Montserrat';
		font-size: 18px;
	}

	/* Create media queries */
	@media only screen and (max-width: 600px) {
		.register-footer {
			margin-top: 0;
		}
		.register-footer p {
			width: 75%;
			text-align: center;
		}
	}
</style>
