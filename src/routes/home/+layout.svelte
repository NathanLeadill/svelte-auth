<script lang="ts">
	import { applyAction, enhance } from '$app/forms'
	import { invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'
</script>

<svelte:head>
	<title>SvelteKit Auth</title>
</svelte:head>

<nav>
	{#if !$page.data.user}
		<a href="/login">Login</a>
		<a href="/register">Register</a>
	{/if}

	{#if $page.data.user}
		<a href="/admin">Admin</a>

		<form
			class="logout"
			action="/logout"
			method="POST"
			use:enhance={() => {
				return async ({ result }) => {
					invalidateAll()
					await applyAction(result)
				}
			}}
		>
			<button type="submit">Log out</button>
		</form>
	{/if}
</nav>
{#if $page.data.user}
	<pre>
		{JSON.stringify($page.data.user, null, 2)}
	</pre>
{/if}
<main>
	<slot />
</main>
