<script>
	export let details = {
		firstname: '',
		lastname: '',
		email: '',
		mobile: '',
	}
</script>

<h1>second</h1>

<input type="text" bind:value={details.email} />

<input type="text" bind:value={details.mobile} />
