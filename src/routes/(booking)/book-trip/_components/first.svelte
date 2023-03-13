<script>
	export let details = {
		firstname: '',
		lastname: '',
		email: '',
		mobile: '',
	}
</script>

<h1>First</h1>

<input type="text" bind:value={details.firstname} />

<input type="text" bind:value={details.lastname} />
