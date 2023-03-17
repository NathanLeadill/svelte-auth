<script lang="ts">
	import { applyAction, enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import DateField from '$lib/components/date-field.svelte'
	import SearchableSelectField from '$lib/components/searchable-select-field.svelte'
	import SelectField from '$lib/components/select-field.svelte'
	import TextField from '$lib/components/text-field.svelte'
	import type { PassengerDetailsCombined } from '$lib/types/account'
	import type { ValidationError } from '$lib/types/common'
	import countries from '$lib/utils/countries.json'
	import { passengerTypeMap } from '$lib/utils/options'

	export let number: number
	export let passenger
	export let type = passenger.passenger_type_id

	let idType: SelectObject | undefined = undefined
	export let requiredFields: string[]
	export let errors: ValidationError<PassengerDetailsCombined>

	export let form
	export let expanded = false

	function toggleExpanded() {
		expanded = !expanded
	}

	function convertPassengerTypeToString(passengerType: string) {
		return passengerTypeMap[passengerType as keyof typeof passengerTypeMap]
	}

	function isRequired(field: string) {
		// return requiredFields.includes(field) ? '*' : ''
		return true
	}

	$: {
		if (errors && errors[0]) {
			errors = errors[1]
		}
	}
</script>

<pre>
	{JSON.stringify(form)}
</pre>

<div class="traveller-details-container">
	<div
		class="passenger-details-header"
		class:expanded
		on:click={() => toggleExpanded()}
		on:keydown={() => {
			toggleExpanded()
		}}
	>
		<div class="passenger-details-labels">
			<span class="passenger-number">Passenger {number + 1}</span>
			<p class="passenger-type">{convertPassengerTypeToString(type)}</p>
		</div>
		<div class="arrow">
			<img src="/images/icons/arrow-up.svg" alt="test" />
		</div>
	</div>
	{#if expanded}
		<div class="passenger-details-body">
			<form
				class="login-form personal-details"
				method="POST"
				action="?/addPassenger"
				use:enhance={() => {
					return async ({ result }) => {
						invalidateAll()
						console.log('result', result)

						const test = await applyAction(result)
						console.log('Test', test)
					}
				}}
			>
				<input hidden name="passenger_type_id" value={type} />
				<div class="form-group">
					<label for="firstName">First name {isRequired('firstname')}</label>
					<TextField
						id="firstName"
						type="text"
						name="firstname"
						placeholder="Enter first name"
					/>
				</div>
				<div class="form-group">
					<label for="lastName">Last name {isRequired('lastname')}</label>
					<TextField
						id="lastName"
						type="text"
						name="lastname"
						placeholder="Enter last name"
					/>
				</div>
				<div class="form-group">
					<label for="email">Gender {isRequired('email')}</label>
					<SelectField
						id="gender"
						name="gender"
						items={[
							{
								label: 'Male',
								value: 'm',
							},
							{
								label: 'Female',
								value: 'f',
							},
							{
								label: 'Other',
								value: 'o',
							},
						]}
					/>
				</div>
				<div class="form-group">
					<label for="mobileNumber">Mobile number {isRequired('mobile')}</label>
					<TextField
						id="mobileNumber"
						name="mobile"
						type="text"
						placeholder="+44 7729280348"
					/>
				</div>
				<div class="form-group">
					<label for="email">Date of Birth {isRequired('birthday')}</label>
					<DateField id="birthday" name="dob" />
				</div>
				<div class="form-group">
					<label for="email">Email address {isRequired('email')}</label>
					<TextField
						id="email"
						name="emailaddress"
						type="email"
						placeholder="Enter your email"
					/>
				</div>
				<div class="form-group">
					<label for="email">Birth country {isRequired('birth_country')}</label>
					<!-- <SearchableSelectField
					id={'birth_country'}
					bind:selected={details.birth_country}
					items={countries.map((el) => ({
						label: el.en_short_name,
						value: el.alpha_3_code
					}))}
				/> -->
				</div>
				<div class="form-group">
					<label for="email"
						>Special Requirements? {isRequired('special_requirements')}</label
					>

					<SelectField
						id="ssr"
						name="ssr"
						items={[
							{
								label: 'Placeholder Yes',
								value: 'y',
							},
							{
								label: 'Placeholder No',
								value: 'no',
							},
						]}
					/>
				</div>
				<div class="form-group">
					<label for="email">Form of Id {isRequired('idType')}</label>

					<SelectField
						id="idType"
						name="idType"
						bind:eValue={idType}
						items={[
							{
								label: 'Passport',
								value: 'passport',
							},
							{
								label: 'Identity Card',
								value: 'id_card',
							},
						]}
					/>
				</div>
				{JSON.stringify(idType)}
				{#if idType}
					<div class="passport-details">
						<span class="passport-details-heading">Identification details</span>
						{#if idType === 'passport'}
							<div class="form-group">
								<label for="passportNumber">Passport Number</label>
								<TextField
									id="passportNumber"
									type="text"
									placeholder="Enter passport number"
									error={errors?.passport_number?.join(', ')}
								/>
							</div>

							<div class="form-group">
								<label for="issueCountry"
									>Issue country {isRequired('passport_issuing_country')}</label
								>
								<SearchableSelectField
									id={'issueCountry'}
									items={countries.map((el) => ({
										label: el.en_short_name,
										value: el.alpha_3_code,
									}))}
								/>
							</div>
							<div class="form-group">
								<label for="nationality"
									>Nationality {isRequired('passport_nationality')}
								</label>
								<SearchableSelectField
									id={'nationality'}
									items={countries.map((el) => ({
										label: el.nationality,
										value: el.alpha_3_code,
									}))}
								/>
							</div>

							<div class="form-group">
								<label for="nationality"
									>Expiration Date {isRequired('passport_expiry')}</label
								>
								<DateField
									id="expirationDate"
									name="passport_expiry"
									error={errors?.passport_expiry?.join(', ')}
								/>
							</div>
						{:else if idType === 'id_card'}
							<div class="form-group">
								<label for="passportNumber">ID Number</label>
								<TextField
									id="id_number"
									name="id_number"
									type="text"
									placeholder="Enter ID number"
									error={errors?.id_number?.join(', ')}
								/>
							</div>
							<div class="form-group">
								<label for="nationality"
									>Expiration Date {isRequired('passport_expiry')}</label
								>
								<DateField
									id="id_expiry"
									name="id_expiry"
									error={errors?.id_expiry?.join(', ')}
								/>
							</div>
						{:else}
							<p>None</p>
						{/if}
					</div>
				{/if}
				{#if form?.success}
					<p>Success</p>
				{/if}
				<div class="submit-container">
					<button type="submit">Add Passenger</button>
				</div>
			</form>
		</div>
	{/if}
</div>

<style>
	.traveller-details-container {
		display: flex;
		flex-direction: column;
		background: white;
		border: 0.5px solid #e4e4e4;
		/* justify-content: center; */
		border-radius: 16px;
		width: 95%;
		/* height: 915px; */
		margin: 0 auto 0 0;
		max-width: 1080px;
	}
	.passenger-details-header.expanded {
		border-bottom: 0.5px solid #e4e4e4;
	}

	.passenger-details-header.expanded .arrow {
		transform: rotate(0deg);
	}

	.passenger-details-header {
		padding: 32px 54px 10px;
		font-family: 'Montserrat';
		font-weight: 600;
		font-size: 18px;
		display: flex;
	}

	.passenger-details-header .arrow {
		display: flex;
		justify-content: center;
		align-items: center;
		transform: rotate(180deg);
	}

	.passenger-details-header:hover {
		cursor: pointer;
	}

	.passenger-details-labels {
		flex-grow: 1;
	}

	.arrow:hover {
		cursor: pointer;
	}

	.passenger-type {
		font-weight: 400;
	}

	.passenger-details-body {
		padding: 32px 54px;
	}

	.personal-details {
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 40px 20px;
	}
	.personal-details > .form-group :global(label),
	.passport-details > .form-group :global(label) {
		font-family: 'Montserrat';
		font-weight: 600;
		font-size: 16px;
	}

	.personal-details > .form-group :global(input),
	.passport-details > .form-group :global(input) {
		width: -webkit-fill-available;
		background: #ffffff;
		border: 1px solid #c0c0c0;
		border-radius: 4px;
	}

	.passport-details {
		display: grid;
		width: 100%;
		grid-template-columns: 1fr 1fr;
		gap: 40px 20px;
		margin-top: 55px;
		grid-column: 1 / 3;
	}

	.passport-details-heading {
		font-family: 'Montserrat';
		font-size: 28px;
		font-weight: 600;
		grid-column: 1 /3;
	}

	.passport-details > .form-group:nth-child(1) {
		grid-column: 2 / 3;
	}

	.submit-container {
		display: flex;
		padding: 0 54px 32px;
		grid-column: 1 / 3;
	}

	.submit-container button {
		width: 100%;
	}

	:global(input) {
		width: 90%;
		margin-top: 3px;
	}

	:global(label) {
		font-size: 16px;
		font-weight: 600;
		color: #000;
		line-height: 24px;
	}

	@media only screen and (max-width: 768px) {
		.traveller-details-container {
			width: 100%;
		}
		.passenger-details-header {
			padding: 32px 20px 10px;
		}

		.passenger-details-body {
			padding: 32px 20px;
		}

		.personal-details {
			grid-template-columns: 1fr;
		}

		.passport-details {
			grid-template-columns: 1fr;
		}

		.passport-details-heading {
			grid-column: 1 / 2;
		}

		.passport-details > .form-group:nth-child(1) {
			grid-column: 1 / 2;
		}
		.form-group {
			grid-column: 1 / 3;
		}
		.form-group .dropdown-heading {
			z-index: 1;
		}
	}
</style>
