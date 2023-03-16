<script lang="ts">
	import Calendar from './calendar.svelte'
	import DropdownIncrement from './dropdown-increment.svelte'
	import SelectField from './select-field.svelte'

	export let onSubmit: (inputOptions: any) => void

	let inputOptions = {
		returnTrip: true,
		location: {
			from: '',
			to: '',
		},
		date: {
			depart: new Date(),
			return: new Date(),
		},
		passengers: {
			adults: 1,
			children: 0,
			infants: 0,
			pets: 0,
		},
	}
</script>

<div class="searchbox-container">
	<div class="trip-options">
		<!-- select dropdown with placeholder for 1 adult, and two radio buttons one for return and one for one way -->
		<div class="trip-options__select">
			<DropdownIncrement
				bind:options={inputOptions.passengers}
				placeholder="Passengers"
			/>
		</div>
		<div class="trip-options__return">
			<input
				type="radio"
				name="trip"
				id="return"
				value={true}
				checked
				bind:group={inputOptions.returnTrip}
			/>
			<label for="return">Return</label>

			<input
				type="radio"
				name="trip"
				id="single"
				value={false}
				bind:group={inputOptions.returnTrip}
			/>
			<label for="single">One Way</label>
		</div>
	</div>
	<!-- Create inputs with labels for from, to, depart date and arrive date -->
	<div class="trip-options__inputs">
		<div class="trip-options__input trip-options__inputs__from">
			<label for="from">From</label>
			<!-- <input type="text" name="from" id="from" bind:value={inputOptions.location.from} /> -->
			<SelectField
				filled
				bind:label={inputOptions.location.from}
				items={[
					{
						label: 'Ragusa',
						value: 'Ragusa',
					},
					{
						label: 'Malta',
						value: 'Malta',
					},
				]}
				placeholder="Select"
				id="from"
				decorator={true}
			/>
		</div>
		<div class="trip-options__input trip-options__inputs__date">
			<label for="depart">Depart</label>
			<!-- <DateField id="depart" bind:value={inputOptions.date.depart} /> -->
			<Calendar
				bind:dateLabel={inputOptions.date.depart}
				disabledDays={[2, 4, 6]}
				placeholder="Please enter a departure date"
			/>
		</div>
		{#if inputOptions.returnTrip}
			<div class="trip-options__input trip-options__inputs__date">
				<label for="return">Return</label>
				<Calendar
					bind:dateLabel={inputOptions.date.return}
					disabledDays={[2, 4, 6]}
					placeholder="Please enter a return date"
				/>
			</div>
		{/if}
		<div class="trip-options__input trip-options__inputs__search">
			<button
				class="search-button"
				on:click={() => {
					onSubmit(inputOptions)
				}}>Search</button
			>
		</div>
	</div>
</div>

<style>
	.searchbox-container {
		/* margin-top: 1.5rem; */
		background: white;
		border-radius: 1rem;
		display: flex;
		flex-direction: column;
		padding: 32px 32px;
		width: calc(100% - 64px);
		height: auto;
		/* create large box shadow */
		box-shadow: 0 0.5rem 3rem 1.75rem rgba(0, 0, 0, 0.15);
	}

	.trip-options {
		display: flex;

		align-items: center;
		border-bottom: 1px solid #e7e7e7;
		padding-bottom: 1rem;
		flex-direction: row;
		gap: 2.5rem;
	}

	.trip-options__return {
		color: black;
	}

	.trip-options__return input {
		accent-color: black;
		margin: 0 0.5rem;
	}

	.trip-options__return label {
		font-weight: 600;
		font-family: 'Montserrat';
		font-size: 1rem;
	}

	.trip-options__inputs {
		padding-top: 1.5rem;
		display: flex;
		gap: 1.375rem;
		align-items: center;
		width: 100%;
	}

	.trip-options__input {
		display: flex;
		flex-direction: column;
		flex-basis: 25%;
	}

	.trip-options__input label {
		font-size: 14px;
		font-weight: 700;
		font-family: 'Montserrat';
		margin-bottom: 0.625rem;
	}

	.trip-options__input :global(.select-field.select-field.decorator) {
		width: auto;
	}

	.trip-options__input :global(.select-field.select-field.decorator::before) {
		content: url('/images/icons/map-pin.svg');
	}

	.trip-options__input :global(#myDropdown.dropdown-content input) {
		width: 100%;
	}

	.search-button {
		font-family: 'Montserrat';
		font-weight: 600;
		background-color: #22283b;
		border-radius: 8px;
		height: 100%;
		padding: 11.6px 24px;
		flex-basis: 20%;
		color: white;
		border: none;
		margin-top: 28px;
	}
	.search-button:hover {
		background-color: #1a1f2d;
		cursor: pointer;
	}

	@media only screen and (max-width: 720px) {
		.searchbox-container {
			display: flex;
			flex-direction: column;
			padding: 0;
			width: 100%;
		}
		.trip-options {
			flex-direction: column-reverse;
			gap: 20px;
			padding: 30px 32px 25px;
		}
		.trip-options__inputs {
			flex-direction: column;
			width: calc(100% - 64px);
			flex-wrap: wrap;
			gap: 25px 15px;
			flex-direction: row;
			padding: 25px 32px;
		}

		.trip-options__input {
			flex: calc(50% - 15px);
		}
		.trip-options__inputs__from {
			flex: calc(100% - 20px);
		}
		.trip-options__inputs__date {
			max-width: calc(50% - 8px);
			flex-basis: 50%;
			padding: 0px;
		}

		.trip-options__inputs__date :global(.date-field.date-field) {
			padding: 10px 12px;
			height: 41px;
			width: -webkit-fill-available;
		}

		:global(.dropdown-header .dropdown-header-icon.dropdown-header-icon) {
			border-left: 0;
		}

		.trip-options__select {
			background: rgba(78, 69, 99, 0.05);
			/* border: 1px solid #4e4563; */
			border-radius: 8px;
			padding: 5px 8px;
			width: calc(100% - 10px);
		}
		.trip-options__select :global(.dropdown.dropdown) {
			width: 100%;
		}

		.trip-options__select :global(.dropdown-header-text) {
			flex-grow: 1;
		}

		.trip-options__select :global(.dropdown-header-icon) {
			padding-left: 0;
		}
		.trip-options__inputs__search,
		.trip-options__inputs__date {
			flex: 100%;
			max-width: 100%;
		}
	}
</style>
