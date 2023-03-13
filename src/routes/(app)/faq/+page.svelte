<script lang="ts">
	import TextField from '$lib/components/text-field.svelte'
	import Swal from 'sweetalert2'

	const data = {
		name: '',
		email: '',
		message: '',
		bookingNumber: '',
	}

	let outerWidth = 0

	async function submitForm() {
		// @TODO BETTER CHECK
		if (!data.name || !data.email || !data.message) {
			Swal.fire({
				title: 'Error!',
				text: 'Please fill out all fields',
				icon: 'error',
				confirmButtonText: 'Ok',
			})
			return
		}
		const request = await fetch('/api/contact', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})

		const { status } = await request.json()
		if (status === 'success') {
			Swal.fire({
				title: 'Success!',
				text: 'Your message has been sent',
				icon: 'success',
				confirmButtonText: 'Ok',
			})
		} else {
			alert('Something went wrong')
		}
	}
</script>

<svelte:window bind:outerWidth />

<div class="faq-container">
	<h2 class="faq-heading">
		{#if outerWidth > 768}
			Frequently asked questions
		{:else}
			FAQ
		{/if}
	</h2>
	<div class="box-container">
		<a href="/faq/booking">
			<div class="box">
				<h3 class="heading">Booking</h3>
				<p class="body">All about company agreements, group travel etc.</p>
				<button class="view-button">View all</button>
			</div>
		</a>
		<a href="/faq/trip">
			<div class="box">
				<h3 class="heading">The trip</h3>
				<p class="body">Everything about luggage, bicycles, on board etc.</p>
				<button class="view-button">View all</button>
			</div>
		</a>
	</div>
	<h2 class="contact-heading">Contact customer support</h2>
	<p class="header-tag">
		Use this form to ask us a question and cancel or modify your booking
	</p>
	<div class="contact-form" id="contact-form">
		<form on:submit={submitForm}>
			<div class="form-group">
				<label for="name">Name</label>
				<TextField
					id="name"
					type="text"
					bind:value={data.name}
					placeholder="Enter your name"
				/>
			</div>
			<div class="form-group">
				<label for="email">Email</label>
				<TextField
					id="email"
					type="email"
					bind:value={data.email}
					placeholder="Enter your email"
				/>
			</div>
			<div class="form-group">
				<label for="message">Message</label>
				<textarea
					id="message"
					bind:value={data.message}
					rows="5"
					placeholder="Type your message here"
				/>
			</div>
			<div class="form-group">
				<label for="email"
					>Booking Reference <span class="optional">(optional)</span></label
				>
				<TextField
					id="bookingNumber"
					type="text"
					bind:value={data.bookingNumber}
					placeholder="Enter your booking reference"
				/>
			</div>
			<button type="submit" class="submit-button">Submit</button>
		</form>
	</div>
</div>

<!-- 55 149 -->
<style>
	.faq-container {
		width: 1062px;
		margin: 0 auto;
	}
	.faq-heading {
		margin-bottom: 35px;
	}

	.box-container {
		display: flex;
		gap: 28px;
	}
	a {
		text-decoration: none;
	}

	.box {
		padding: 40px 80px;
		border: 0.5px solid #c7c7c7;
		border-radius: 16px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	h2 {
		font-family: 'Playfair Display';
		font-size: 40px;
		font-weight: 600;
		color: #000;
		margin-bottom: 0;
		line-height: 95px;
	}
	.heading {
		font-family: 'Playfair Display';
		font-size: 40px;
		font-weight: 600;
		color: #000;
		margin-bottom: 0;
	}
	.body {
		font-family: 'Montserrat';
		font-size: 18px;
		font-weight: 400;
		color: #000;
		text-align: center;
		line-height: 32px;
	}

	.header-tag {
		font-family: 'Montserrat';
		font-size: 18px;
		font-weight: 400;
		color: #000;
		margin-bottom: 16px;
	}
	.contact-form {
		border: 0.5px solid #c7c7c7;
		border-radius: 16px;
		max-width: 1062px;
		margin: 0 auto;
		padding: 55px 149px;
	}

	.contact-form form {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 16px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		margin-bottom: 16px;
	}

	.form-group:nth-of-type(3),
	.form-group:nth-of-type(4) {
		grid-column: 1 / 3;
	}

	.optional {
		color: rgba(0, 0, 0, 0.5);
		font-weight: 400;
	}

	label {
		font-family: 'Montserrat';
		font-size: 16px;
		font-weight: 700;
		color: #000;
		margin-bottom: 8px;
		line-height: 24px;
	}

	textarea {
		font-family: 'Montserrat';
		padding: 13px 17px;
	}
	.view-button {
		margin-top: 20px;
		padding: 14px 78px;
	}
	.submit-button {
		grid-column: 1 / 3;
		width: 300px;
		margin: 32px auto;
		height: 51px;
	}

	@media only screen and (max-width: 768px) {
		.faq-container {
			width: 100%;
			padding: 65px 16px 0;
		}
		.faq-heading {
			font-size: 50px;
		}
		.box-container {
			display: flex;
			flex-direction: column;
			position: relative;
		}
		.box-container a {
			width: 100%;
			position: relative;
		}
		.box {
			padding: 17.5px 25px;
			display: flex;
			align-items: flex-start;
			position: relative;
		}
		.box::after {
			content: ' ';
			background-image: url('/images/icons/faq-arrow.svg');
			background-repeat: no-repeat;
			display: block;
			position: absolute;
			width: 16px;
			height: 32px;
			right: 10px;
			margin-top: 12px;
		}
		.box h3 {
			font-size: 36px;
		}
		.box p,
		.box button {
			display: none;
		}
		.box .heading {
			margin: 0;
		}
		.contact-heading {
			margin-top: 75px;
			font-size: 28px;
			line-height: 24px;
		}
		.contact-form {
			padding: 55px 20px;
		}
		.contact-form .form-group {
			grid-column: 1 / 3;
		}
	}
</style>
