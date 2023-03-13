<script lang="ts">
	import TextField from '$lib/components/text-field.svelte'

	export let editMode: boolean
	let data = {
		oldPassword: '',
		newPassword: '',
		confirmPassword: '',
	}
</script>

<div class="password-info-form">
	<span class="password-info-heading">{editMode ? 'update' : ''} password</span>
	<div class="form-group">
		<label for="first-name">Current Password</label>
		<TextField
			type="password"
			id="currentPassword"
			placeholder="Please enter your current password"
			bind:value={data.oldPassword}
			disabled={!editMode}
		/>
	</div>
	<div class="form-group">
		<label for="last-name">New Password</label>
		<TextField
			type="password"
			id="newPassword"
			placeholder="Please enter your new password"
			bind:value={data.newPassword}
			disabled={!editMode}
		/>
	</div>
	<div class="form-group full-width">
		<label for="email">Confirm new Password</label>
		<TextField
			type="password"
			id="confirmPassword"
			placeholder="Please enter your new password again"
			bind:value={data.confirmPassword}
			disabled={!editMode}
		/>
	</div>
	{#if editMode}
		<button class="cancel-button">Cancel</button>
		<button class="save-button">Save changes</button>
	{/if}
</div>

<style>
	.password-info-form {
		display: flex;
		flex-direction: column;
		gap: 20px;
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
	.password-info-heading {
		font-weight: 600;
		font-size: 22px;
		margin-bottom: 42px;
	}
	.password-info-heading::first-letter {
		text-transform: capitalize;
	}
</style>
