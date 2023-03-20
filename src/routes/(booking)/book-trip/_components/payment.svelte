<script lang="ts">
	import { enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import CardNumberField from '$lib/components/card-number-input.svelte'
	import DateField from '$lib/components/date-field.svelte'
	import Loading from '$lib/components/loading.svelte'
	import TextField from '$lib/components/text-field.svelte'
	import type { JourneyType } from '$lib/types/destination'
	import { bookingState } from '$lib/utils/stores'

	export let journey: JourneyType
	export let goToNext: () => void

	type FormResult = {
		type: 'success' | 'error'
		status: number
		errors?: Record<string, string | string[]>
		data: {
			success: boolean
			[error: string]: string | string[]
		}
	}

	let error = false
	let formResult: Partial<FormResult> = {
		errors: {
			name: [],
			number: [],
			expireDate: [],
			cvc: [],
		},
	}
	let running = false
</script>

<pre>
    {JSON.stringify(formResult)}
</pre>
<h1>Payment</h1>
<div class="payment-form">
	<form
		class="login-form personal-details"
		method="POST"
		action="?/runPayment"
		use:enhance={() => {
			return async ({ form, action, result }) => {
				invalidateAll()
				console.log('form', form, 'action', action, 'result', result)
				if (result.type === 'success') {
					return goToNext()
				}
				formResult = {
					type: result.type,
					errors: result.data,
				}
			}
		}}
	>
		<input hidden name="token" value={$bookingState.tokens.token} />
		<div class="promo-code">
			<div class="form-group">
				<label for="name">Promo code</label>
				<TextField
					id="promo-code"
					type="text"
					name="promo-code"
					placeholder="Promo code"
				/>
			</div>
		</div>
		<div class="divider" />
		<div class="card-info">
			<div class="form-group">
				<label for="name">Name</label>
				{formResult.errors && formResult.errors.name}
				<TextField
					id="name"
					type="text"
					name="name"
					placeholder="Miss Elizabeth Bennet"
					required
					error={formResult.errors && formResult.errors.name?.join(', ')}
					value=" "
				/>
			</div>
			<div class="form-group">
				<label for="card-number">Card Number</label>
				{formResult.errors && formResult.errors.number}

				<CardNumberField
					id="card-number"
					name="card-number"
					required
					error={formResult.errors && formResult.errors.number.join(', ')}
					value=" "
				/>
			</div>
			<div class="form-group">
				<label for="expire-date">Expire Date</label>
				<DateField
					id="expire-date"
					name="expire-date"
					month={true}
					required
					value={new Date()}
					error={formResult.errors && formResult.errors.expireDate.join(', ')}
				/>
			</div>
			<div class="form-group">
				<label for="cvc">CVC</label>

				<TextField
					id="cvc"
					type="text"
					name="cvc"
					placeholder="123"
					required
					error={formResult.errors.cvc?.join(', ')}
				/>
			</div>
		</div>
		<div class="price-container">
			<button type="submit">Pay</button>
		</div>
	</form>

	<div class="footer">
		<p class="total-label">Total Amount</p>
		<p class="total">€ {Number($bookingState.price.amount).toFixed(2)}</p>
	</div>
	<div class="status-container">
		{#if running}
			<Loading />
		{:else if error}
			<p>There was an error processing your payment</p>
		{/if}
	</div>
</div>

<!-- <p>{totalPrice}</p> -->
<style>
	h1 {
		font-family: 'Playfair Display';
		font-style: normal;
		font-weight: 600;
		font-size: 40px;
		line-height: 95px;
	}
	.promo-code {
		padding: 55px;
		border-bottom: 1px solid #c7c7c7;
	}
	.payment-form {
		background: #ffffff;
		border: 0.5px solid #c7c7c7;
		border-radius: 16px;
		margin: 0 auto;
	}

	.card-info {
		padding: 55px;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 40px 15px;
	}

	/* TODO MAKE THIS A GLOBAL CLASS */
	.form-group {
		display: flex;
		flex-direction: column;
		gap: 5px;
	}

	.footer {
		border-top: 1px solid black;
		grid-column: 1 / 3;
		padding: 20px 58px;
		display: flex;
	}
	.total-label {
		flex-grow: 1;
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 600;
		font-size: 22px;
		line-height: 27px;
	}
	.total {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 700;
		font-size: 24px;
		line-height: 32px;
	}
	.status-container {
		display: flex;
		justify-content: center;
	}

	@media only screen and (max-width: 768px) {
		.card-info .form-group {
			grid-column: 1 / 3;
		}
		.price-container {
			text-align: center;
			padding: 25px 0;
		}
		.price-container button {
			width: 100%;
			height: 50px;
			font-size: 22px;
			font-weight: 500;
		}
	}
</style>
