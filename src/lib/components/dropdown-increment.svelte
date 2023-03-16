<script lang="ts">
	import clickOutside from '$lib/actions/click-outside'

	export let options: Record<string, number> = {}
	export let placeholder: string
	let dropdownExpand = false
	function toggleDropdown(): void {
		dropdownExpand = !dropdownExpand
	}

	function incrementValue(key: string): void {
		options[key] = options[key] + 1
	}

	function decrementValue(key: string): void {
		options[key] = options[key] - 1
	}
</script>

<div
	class="dropdown"
	use:clickOutside={() => (dropdownExpand = false)}
	on:click={() => {
		dropdownExpand = dropdownExpand ? true : false // weird but it works this way?;
	}}
	on:keydown={(e) => {
		if (e.key === 'Escape') {
			dropdownExpand = false
		}
	}}
>
	<div
		class="dropdown-header"
		on:click={() => {
			toggleDropdown()
		}}
		on:keydown={(e) => {
			if (e.key === 'Escape') {
				dropdownExpand = false
			}
		}}
	>
		<span class="dropdown-header-text">{placeholder}</span>
		<span class="dropdown-header-icon">
			<img src="/images/icons/arrow-up.svg" alt="test" />
		</span>
	</div>
	{#if dropdownExpand}
		<div class="dropdown-body">
			{#each Object.entries(options) as [key, value]}
				<div class="dropdown-body-item">
					<div class="label">{key}</div>
					<div class="controls">
						<button
							on:click={() => {
								decrementValue(key)
							}}>-</button
						>
						<span>{value}</span>
						<button
							on:click={() => {
								incrementValue(key)
							}}>+</button
						>
					</div>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style>
	.dropdown {
		position: relative;
		width: 185px;
	}

	.dropdown-header:hover {
		cursor: pointer;
	}

	.dropdown-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 8px;
		/* border: 1px solid #ccc; */
	}

	.dropdown-header-text {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 600;
		font-size: 16px;
		line-height: 20px;
		/* identical to box height */

		color: #000000;
	}

	.dropdown-header-icon {
		font-size: 1rem;
		transform: rotate(180deg);
		border-left: 0.5px solid #22283b;
		padding-left: 30px;
	}

	.dropdown-header-icon img {
		width: 16px;
	}

	.dropdown-body {
		position: absolute;
		top: 100%;
		left: 0;
		width: 275px;
		background-color: #fff;
		border: 1px solid #ccc;
		border-radius: 0.25rem;
		z-index: 99999;
	}

	.dropdown-body-item {
		padding: 15px 20px 7.5px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		text-transform: capitalize;
		font-family: 'Montserrat';
		font-weight: 600;
	}

	.controls {
		display: flex;
		align-items: center;
	}

	.controls span {
		width: 20px;
		text-align: center;
	}

	.controls button:hover {
		cursor: pointer;
	}
</style>
