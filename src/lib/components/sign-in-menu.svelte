<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import clickOutside from '$lib/actions/click-outside'

	export let type = 'white'

	let signInMenuOpen = false
	function toggleSignInMenu(event?: MouseEvent) {
		if (event) {
			const target = event.target as HTMLDivElement
			const menu = target.parentElement?.nextElementSibling as HTMLDivElement
			if (menu) menu.focus()
		}

		signInMenuOpen = !signInMenuOpen
	}

	function handleKeypress(event: KeyboardEvent) {
		if (event.key === 'Escape') {
			signInMenuOpen = false
		}
	}

	async function runLogout() {
		const response = await fetch('/api/auth/logout', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				token: $page.data.user.token,
			}),
		})
		const { status } = await response.json()
		if (status === 'success') {
			goto('/', {
				replaceState: true,
				invalidateAll: true,
			})
		}
	}

	function goToPage(page: string) {
		signInMenuOpen = false
		goto(page)
	}

	function goToLoginPage() {
		signInMenuOpen = false
		goto('/login')
	}
</script>

{#if !$page.data.user}
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<button class="sign-in-button" on:click={goToLoginPage}> Log in </button>
{:else}
	<div
		class="signedInText"
		on:click|stopPropagation={toggleSignInMenu}
		on:keydown={handleKeypress}
	>
		<img
			class="user-signed-in-icon"
			alt="User signed in icon"
			src="/images/icons/user-icon.svg"
		/>
		<p>{$page.data.user.firstname} {$page.data.user.lastname}</p>
		<img
			class="expand-user-menu"
			alt="expand-user-options"
			src="/images/icons/arrow-down.png"
		/>
	</div>
	{#if signInMenuOpen}
		<div
			class="signed-in-menu"
			tabIndex="0"
			class:signInMenuOpen
			on:keydown={handleKeypress}
			use:clickOutside={toggleSignInMenu}
		>
			<a class="menu-item active" on:click={() => goToPage('/user/profile')}>
				Profile
			</a>
			<a class="menu-item" on:click={() => goToPage('/my-trips')}> My Trips </a>
			<p class="menu-item" on:click={runLogout}>Log out</p>
		</div>
	{/if}
{/if}

<style>
	.log-in {
		font-family: 'Montserrat';
		font-size: 16px;
		font-weight: 600;
		color: #000;
		text-decoration: none;
	}

	.signedInText {
		display: flex;
		align-items: center;
		padding-right: 20px;
	}

	.signed-in-menu:focus {
		outline: none;
	}

	.signedInText p {
		font-family: 'Montserrat';
		font-size: 16px;
		font-weight: 600;
		color: #000;
		text-decoration: none;
	}

	p.menu-item {
		margin: 0;
	}

	.menu-item:hover {
		cursor: pointer;
		background: rgba(44, 48, 78, 0.1);
	}

	.signedInText img {
		margin-right: 8px;
	}

	.expand-user-menu {
		margin: 0 0.5rem;
	}

	.signedInText:hover {
		cursor: pointer;
	}

	.signed-in-menu {
		background: #ffffff;
		box-shadow: 0px 4px 92px rgba(0, 0, 0, 0.12);
		border-radius: 8px;
		padding: 18px 16px;
		flex-direction: column;
		position: absolute;
		width: 160px;
		top: 50px;
		display: none;
	}

	.signed-in-menu.signInMenuOpen {
		display: flex;
		z-index: 1;
	}

	.signed-in-menu a:hover {
		background: rgba(44, 48, 78, 0.1);
	}

	.signed-in-menu a {
		font-family: 'Nunito';
		font-size: 13px;
		font-weight: 400;
		color: #000;
		text-decoration: none;
		padding: 10px 12px;
		border-radius: 6px;
	}
	.signed-in-menu .menu-item {
		font-family: 'Nunito';
		font-size: 14.5px;
		font-weight: 400;
		color: #000;
		text-decoration: none;
		padding: 6.5px 12px;
		border-radius: 6px;
	}

	.sign-in-button {
		background: none;
		font-size: 12px;
		padding: 12.5px 30px;
	}

	.sign-in-button:hover {
		cursor: pointer;
		background: #353d57;
	}

	@media only screen and (max-width: 768px) {
		.log-in {
			margin: 0;
		}
		.signedInText {
			margin: 0 auto;
		}
	}
</style>
