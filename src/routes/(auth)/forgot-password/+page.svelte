<script lang="ts">
	import { applyAction, enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import TextField from '$lib/components/text-field.svelte'
	import AuthTemplate from '$lib/templates/auth-template.svelte'

	const inputData = {
		email: '',
	}

	let forgotStatus = ''

	// async function forgotPasswordHandler() {
	// 	const returnData = await fetch('/api/auth/forgot-password', {
	// 		method: 'POST',
	// 		headers: {
	// 			'Content-Type': 'application/json',
	// 		},
	// 		body: JSON.stringify(inputData),
	// 	})

	// 	const { status } = await returnData.json()
	// 	forgotStatus = status
	// }
</script>

<div class="forgot-password-container">
	<AuthTemplate>
		<h1 slot="title">Forgot your password?</h1>
		<p slot="description">
			Enter your email and we will send you a link to create a new password.
		</p>
		<form
			class="login-form"
			slot="form"
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
				type="email"
				name="email"
				bind:value={inputData.email}
				placeholder="Enter your email"
			/>

			<button type="submit">Submit</button>
		</form>
		<div class="forgot-password-footer" slot="footer">
			<p>Return to <a href="/login">Login</a></p>
		</div>
		<div class="status" slot="status">
			{#if forgotStatus.length > 0}
				<p
					class:success={forgotStatus === 'success'}
					class:fail={forgotStatus === 'fail'}
				>
					{forgotStatus}
				</p>
			{/if}
		</div>
	</AuthTemplate>
</div>

<style>
	.forgot-password-container {
		margin: 50px 0;
	}
	.forgot-password-footer {
		margin-top: 43px;
		background-color: #f7f7f7;
		border-bottom-left-radius: 16px;
		border-bottom-right-radius: 16px;
		display: flex;
		justify-content: center;
	}
	.forgot-password-footer p {
		margin: 0;
		padding: 30.5px 0;
		font-family: 'Montserrat';
		font-size: 18px;
		text-align: center;
	}

	p a {
		color: #22283b;
		text-decoration: none;
		font-weight: 700;
	}

	.status p {
		text-align: center;
		font-family: 'Montserrat';
		text-transform: capitalize;
	}

	p.success {
		color: green;
	}

	p.fail {
		color: red;
	}

	@media only screen and (max-width: 768px) {
		.forgot-password-container {
			margin-bottom: 75px;
		}
	}
</style>
