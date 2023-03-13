<script lang="ts">
	import First from './_components/first.svelte'
	import Second from './_components/second.svelte'

	let count = 0

	let details = {
		firstname: '',
		lastname: '',
		email: '',
		mobile: '',
	}
</script>

<pre>
    {JSON.stringify(details, null, 2)}
</pre>

{#if count === 0}
	<First bind:details />
{:else if count === 1}
	<Second bind:details />
{/if}

<button
	on:click={() => {
		count = 1
	}}>Next</button
>
