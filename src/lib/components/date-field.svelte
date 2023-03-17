<script lang="ts">
	// @TODO DEPRECIATE
	export let value: Date | string | undefined = undefined
	export let id: string
	export let error = ''
	export let month = false
	export let name = ''
	export let max = month ? '9999-12' : '9999-12-31'
	export let dateOnly = false
	export let inputValue: Date | undefined = undefined
	export function handleInput(e: Event) {
		const target = e.target as HTMLInputElement
		inputValue = new Date(target.value)
		value = dateOnly ? target.value?.split('T')[0] : target.value
	}
</script>

<input
	{id}
	class:error
	class="date-field"
	type={month ? 'month' : 'date'}
	placeholder="test"
	{name}
	{max}
	on:change={handleInput}
/>

<style>
	.date-field {
		background-color: rgba(34, 40, 59, 0.05);
		border: none;
		border-radius: 5px;
		font-family: 'Montserrat';
		font-weight: 400;
		font-size: 14px;
		outline: 0;
		padding: 10.4px 12px;
		height: 21px;
		margin-top: 1px;
	}
	.date-field.date-field.date-field.error {
		border: 1px solid red;
	}
</style>
