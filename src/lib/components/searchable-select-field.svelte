<script lang="ts">
	// WORK IN PROGRESS NEEDS TYPES
	import clickOutside from '$lib/actions/click-outside'
	import type { SelectMenuOptions } from '$lib/types/common'
	import TextField from './text-field.svelte'

	let menuOpen = false
	let inputValue = ''
	export let id: string
	export let selected: string | undefined = undefined
	export let items: SelectMenuOptions[] = []
	export let eLabel: string | undefined = undefined
	export let onSelect: (value: string) => void = () => {}
	export let name = ''
	export let error = ''

	function select(item: SelectMenuOptions) {
		selected = item.value
		eLabel = item.label
		inputValue = item.label
		menuOpen = false
		onSelect(item.value)
	}
	// TODO I GUESS WE COULD ACTUALLY ONLY USE THE FILTERED ITEMS IF FILTER IS ACTIVE?
	$: filteredItems =
		items.length > 0
			? items.filter(
					(item) =>
						item.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1
			  )
			: []
</script>

<div
	class="dropdown-heading"
	{id}
	on:click={() => {
		menuOpen = true
	}}
	use:clickOutside={() => (menuOpen = false)}
>
	<div id="myDropdown" class:show={menuOpen} class="dropdown-content">
		<TextField bind:value={inputValue} {name} {error} />
		{#if menuOpen}
			<div class="body">
				<ul class="options">
					{#each filteredItems as item}
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
		position: absolute;
		min-width: 230px;
		/* border: 1px solid #ddd; */
		width: 100%;
		display: block;
		margin: 0;
		height: 100%;
	}

	.dropdown-content .body {
		z-index: 2;
	}

	.dropdown-heading {
		width: 100%;
		/* border: 1px solid #c0c0c0; */
		border-radius: 4px;
		display: block;
		/* padding: 0.65rem 0.75rem; */
		margin-top: 2px;
		position: relative;
		height: 42px;
	}

	#myDropdown :global(input) {
		width: 100%;
		box-sizing: border-box;
		height: 100%;
	}

	.show {
		display: block;
	}

	.options {
		list-style: none;
		margin: 0;
		padding: 0;
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
		overflow-y: auto;
		position: relative;
		width: 100%;
	}
</style>
