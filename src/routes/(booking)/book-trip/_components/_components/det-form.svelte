<script lang="ts">
	import { applyAction, enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import DateField from '$lib/components/date-field.svelte'
	import SelectField from '$lib/components/select-field.svelte'
	import TextField from '$lib/components/text-field.svelte'
	export let form

	function isRequired(key: string) {
		return true
	}

	const details = {
		name: '',
	}
</script>

<pre>
    {JSON.stringify(details, null, 2)}
</pre>
<form
	class="login-form"
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
	<input name="name" type="text" placeholder="Name" />
	<input name="age" type="text" placeholder="Surname" />
	<input name="email" type="email" placeholder="Email" />

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

	{#if form?.success}
		<p>Success</p>
	{/if}
	<button type="submit">Add Passenger</button>
</form>

<style>
	form {
		border: 1px solid grey;
		padding: 35px 50px;
	}
</style>
