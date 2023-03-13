<script lang="ts">
	type Type = $$Generic<'email' | 'text' | 'password' | 'number'>
	type Value = Type extends 'number' ? number : string

	export let disabled = false
	export let tabIndex = 0
	export let readOnly = false
	export let id: string | undefined = undefined
	export let value: Value = '' as Value
	export let name = ''
	export let type: Type = (
		typeof value === 'number' ? 'number' : 'text'
	) as Type
	export let placeholder: string | undefined = undefined
	export let error = ''
	export let filled = false
	export let max: number | undefined = undefined
	export let pattern: string | undefined = undefined

	function input(
		e: Event & { currentTarget: EventTarget & HTMLInputElement }
	): void {
		value = (
			type === 'number' ? Number(e.currentTarget.value) : e.currentTarget.value
		) as Value
	}
</script>

<input
	on:focus
	on:click
	on:blur
	on:mousedown
	maxlength={max}
	{type}
	{name}
	value={value || ''}
	{placeholder}
	{id}
	{disabled}
	{pattern}
	tabindex={tabIndex}
	class="text-field"
	class:error
	class:filled
	on:input={input}
	readonly={readOnly}
/>

<style>
	.text-field {
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

	.text-field:invalid {
		border-color: red;
	}

	.text-field::placeholder {
		color: gray;
	}

	.text-field.text-field.text-field.error {
		border-color: red;
	}

	.text-field.text-field.text-field:focus {
		border-color: teal;
	}

	.text-field.text-field.text-field.text-field.filled {
		background-color: rgba(34, 40, 59, 0.05);
		border: none;
	}
	.text-field.text-field.text-field.text-field.filled::placeholder {
		color: #000;
		font-weight: 300;
	}
</style>
