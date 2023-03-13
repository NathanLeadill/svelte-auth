<script lang="ts">
	import type { Account } from '$lib/types/account'
	import PasswordInfo from './_components/password-info.svelte'
	import PersonalInfo from './_components/personal-info.svelte'

	let editMode = true
	export let data
	const userInfo: Account = data.user
	let personalUserInformation = {
		firstname: userInfo.firstname,
		lastname: userInfo.lastname,
		email: userInfo.email,
		mobile: userInfo.mobile,
	}

	async function saveDetails(type: string) {
		// CHANGE DETAIL
	}
</script>

<div class="container">
	<div class="personal-details">
		<h2 class="heading">Personal Details</h2>
		<div class="details-header">
			<p class="tag">Update your personal details here</p>
			<button class="edit" on:click={() => (editMode = !editMode)}
				><img src="/images/icons/pencil.svg" alt="Edit pencil icon" />{editMode
					? 'Save details'
					: 'Edit details'}</button
			>
		</div>

		<div class="details">
			<PersonalInfo
				{editMode}
				bind:data={personalUserInformation}
				{saveDetails}
			/>

			<hr class="divider" />

			<PasswordInfo {editMode} />
		</div>
	</div>
</div>

<style>
	.personal-details {
		width: 100%;
		margin-top: 40px;
	}
	.details-header {
		display: flex;
		margin-bottom: 2.5rem;
	}
	.heading {
		font-family: 'Playfair Display';
		font-size: 40px;
		font-weight: 600;
		color: #000;
		letter-spacing: 0.1rem;
		margin-bottom: 1rem;
	}
	.tag {
		font-family: 'Montserrat';
		font-size: 18px;
		font-weight: 400;
		color: #000;
		flex-grow: 1;
	}

	.details {
		border: 0.5px solid #c7c7c7;
		border-radius: 16px;
		padding: 70px 150px;
	}

	.divider {
		border: none;
		background: #e7e7e7;
		height: 0.25px;
		margin: 50px 0 40px;
	}
	.edit {
		background: none;
		border: 0.5px solid #22283b;
		border-radius: 8px;
		padding: 15px 25px;
		height: fit-content;
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 500;
		font-size: 16px;
		line-height: 20px;
		text-align: center;
		color: #000000;
		display: flex;
		align-items: center;
	}
	.edit img {
		padding-right: 10px;
	}

	@media only screen and (max-width: 720px) {
		.personal-details .details {
			display: flex;
			flex-direction: column;
			padding: 30px 22px;
		}
		.details-header {
			flex-direction: column;
			align-items: flex-start;
		}
	}
</style>
