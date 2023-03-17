<script lang="ts">
	import clickOutside from '$lib/actions/click-outside'
	import { afterUpdate } from 'svelte'
	import TextField from './text-field.svelte'

	type SelectObject = {
		label: string
		value: string | number
	}
	export let label: string | undefined = undefined
	export let eValue: string | number | undefined = undefined
	export let value: SelectObject | undefined = undefined
	export let items: SelectObject[] = []
	export let placeholder: string | undefined = undefined
	export let id: string | undefined = undefined
	export let tabIndex = 0
	export let error = ''
	export let name = ''
	export let readOnly = false
	export let filled = false
	export let decorator = false

	$: label = value && value.label ? value.label : ''
	$: eValue = value ? value.value : ''

	let container: HTMLDivElement
	let itemContainer: HTMLDivElement
	let expanded = false
	let partiallyExpanded = false

	$: selectedIdx = value ? items.indexOf(value) : -1

	function toggle(): void {
		expanded = !expanded
	}

	function collapse(): void {
		expanded = false
	}

	function expand(): void {
		expanded = true
	}

	function select(item: SelectObject): void {
		value = item
		collapse()
	}

	function scrollIntoView(): void {
		const selectedNode = itemContainer?.querySelector("[aria-selected='true']")

		if (!selectedNode) {
			return
		}

		selectedNode.scrollIntoView({ block: 'nearest' })
	}

	function previousItem(): void {
		value = items[Math.max(0, selectedIdx - 1)]
	}

	function nextItem(): void {
		value = items[Math.min(items.length - 1, selectedIdx + 1)]
	}

	function expanding(): void {
		partiallyExpanded = true
	}

	function collapsed(): void {
		partiallyExpanded = false
	}

	function blur(e: FocusEvent): void {
		if (!container.contains(e.relatedTarget as Node)) {
			collapse()
		}
	}

	afterUpdate(() => {
		scrollIntoView()
	})
</script>

<div
	class="dropdown-heading"
	{id}
	on:click={() => {
		expanded = true
	}}
	use:clickOutside={() => (expanded = false)}
>
	<div id="myDropdown" class:show={expanded} class="dropdown-content">
		<!-- <Input bind:inputValue on:input={handleInput} /> -->
		<input {name} value={eValue} hidden />
		<TextField value={value ? value.label : ''} disabled />
		{#if expanded}
			<div class="body">
				<ul class="options">
					{#each items as item}
						<!-- <p>{item.label}</p> -->

						<li class="option" role="option" on:click={() => select(item)}>
							{item.label}
						</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
</div>

<style>
	:global(
			.personal-details .dropdown-heading input.text-field.text-field.text-field
		) {
		width: calc(100% - 23px);
		padding: 0 20px;
		/* border: none; */
		padding: 0px;
		font-family: 'Montserrat';
		font-size: 16px;
		height: 100%;
		margin: 0;
	}

	.dropdown-content {
		display: none;
		position: absolute;
		min-width: 230px;
		border: none;
		width: 100%;
		margin: 0;
		height: 100%;
		box-sizing: border-box;
		display: flex;
		position: relative;
		flex-direction: column;
	}

	.dropdown-content :global(.text-field.text-field) {
		height: 42px;
		border-color: #d7d7d7;
	}

	.dropdown-heading {
		width: 100%;
		border-radius: 4px;
		display: block;
		margin-top: 2px;
		position: relative;
		height: 42px;
	}

	#myDropdown :global(input) {
		width: 100%;
		box-sizing: border-box;
		padding-left: 10px;
		background: none;
		min-height: 42.8px;
	}

	.show {
		display: block;
	}

	.options {
		list-style: none;
		margin: 0;
		padding: 0;
		position: absolute;
		background: #f5f5f6;
		width: 100%;
		z-index: 3;
	}

	.option {
		cursor: pointer;
		font-size: inherit;
		padding: 19px 21px;
		font-family: 'Montserrat';
		font-weight: 400;
	}

	.option[aria-selected='true'] {
		background-color: var(--color-gray-lightest);
	}

	.option:hover {
		background-color: var(--color-light-background);
	}
	.body {
		background-color: #f5f5f6;

		border-radius: 0 0 10px 10px;
		float: left;
		font-size: inherit;
		left: 0;
		max-height: 300px;
		position: relative;
		width: 100%;
	}

	@media only screen and (max-width: 768px) {
		.dropdown-content {
			width: 100%;
			max-width: 100%;
		}
	}
</style>
