<script lang="ts">
	import { page } from '$app/stores'
	import TextField from '$lib/components/text-field.svelte'
	import type { Account } from '$lib/types/account'

	export let editMode: boolean
	export let saveDetails: () => void
	export let data: Account

	const userInfo: Account = $page.data.user
	$: detailsChanged = Object.entries(data).some(([key, value]) => {
		if (userInfo[key as keyof typeof userInfo] !== value) {
			return true
		}
		return false
	})
</script>

<div class="personal-info-form">
	<div class="form-group">
		<label for="first-name">First Name</label>
		<TextField
			id="first-name"
			placeholder={data.firstname}
			bind:value={data.firstname}
			disabled={!editMode}
		/>
	</div>
	<div class="form-group">
		<label for="last-name">Last Name</label>
		<TextField
			id="last-name"
			placeholder={data.lastname}
			bind:value={data.lastname}
			disabled={!editMode}
		/>
	</div>
	<div class="form-group full-width">
		<label for="email">Email</label>
		<TextField
			id="email"
			placeholder={data.email}
			bind:value={data.email}
			disabled={!editMode}
		/>
	</div>
	<div class="form-group full-width">
		<label for="mobile">Phone</label>
		<TextField
			id="mobile"
			placeholder={data.mobile}
			bind:value={data.mobile}
			disabled={!editMode}
		/>
	</div>
	{#if editMode}
		<button class="cancel-button">Cancel</button>
		<button
			disabled={!detailsChanged}
			class="save-button"
			on:click={saveDetails}>Save changes</button
		>
	{/if}
</div>

<style>
	.personal-info-form {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 20px;
	}

	.full-width {
		grid-column: span 2;
	}

	.form-group {
		display: flex;
		flex-direction: column;
	}

	.form-group label {
		font-family: 'Montserrat';
		font-size: 16px;
		font-weight: 700;
		color: #000;
		margin-bottom: 10px;
	}
	@media only screen and (max-width: 720px) {
		.personal-info-form {
			display: flex;
			flex-direction: column;
		}
	}
</style>
