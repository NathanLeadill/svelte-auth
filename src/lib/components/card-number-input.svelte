<script lang="ts">
	export let id: string
	export let value = ''
	export let name = ''
	export let required = false
	export let error = ''

	let cardNumber = ''

	function onChange(e: Event) {
		const target = e.target as HTMLInputElement
		cardNumber = target.value
			.replace(/[^0-9]/gi, '')
			.replace(/(.{4})/g, '$1 ')
			.trim()
	}

	$: {
		value = cardNumber.replace('/ /g', '')
	}
</script>

<input
	class:error
	{id}
	{name}
	{required}
	type="text"
	value={cardNumber}
	on:input={(e) => onChange(e)}
	max={16}
	maxLength={19}
	placeholder="0000 0000 0000 0000"
/>

<style>
	input {
		border: grey 1px solid;
		border-radius: 5px;
		font-family: 'Montserrat';
		font-weight: 400;
		font-size: 14px;
		height: 20px;
		outline: 0;
		padding: 0.65rem 0.75rem;
		transition: border-color var(--speed-fast) ease;
	}

	input.error {
		border-color: red;
	}
</style>
