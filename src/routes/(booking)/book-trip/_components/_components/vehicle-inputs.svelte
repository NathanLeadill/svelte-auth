<script lang="ts">
	import SearchableSelectField from '$lib/components/searchable-select-field.svelte'
	import SelectField from '$lib/components/select-field.svelte'
	import TextField from '$lib/components/text-field.svelte'

	export let selected
	export let schedule

	const travelingOptions = [
		{
			label: 'Foot passenger (No Vehicle)',
			value: 0,
		},
		{
			label: 'Car',
			value: 2,
		},
		{
			label: 'Bike',
			value: 11,
		},
		{
			label: 'Motorbike',
			value: 10,
		},
	]
	export let type

	export let activeVehicle = {
		id: 0,
		make: '',
		model: '',
		registration: '',
	}

	async function fetchVehicles() {}

	let models: SelectMenuOptions[] = []

	async function fetchCarModels(make: string) {
		const response = await fetch(`/api/vehicles/${make.toLowerCase()}`)
		const data = await response.json()
		models = data.map((el: string) => ({ label: el, value: el }))
	}

	async function fetchCarMakes() {
		const response = await fetch('/api/vehicles')
		const data = await response.json()
		return data.map((el: string) => ({ label: el, value: el }))
	}

	const fetchCars = fetchCarMakes()
</script>

{#if selected[type].schedule_id === schedule.schedule_id}
	<hr class="ticket-separate" />
	<div class="ticket-options">
		<div class="travel-option-select">
			<label for="travelOption">How are you travelling?</label>
			<!-- @TOOD make this select the route -->
			<SelectField
				id="travelOption"
				bind:eValue={activeVehicle.id}
				items={travelingOptions}
			/>
		</div>
	</div>
	{#if selected[type].vehicle?.id === 2}
		<div class="vehicle-options">
			<div class="form-group">
				{#await fetchCars then data}
					<label for="make">Make of vehicle:</label>
					<SearchableSelectField
						id="make"
						bind:selected={activeVehicle.make}
						items={data}
						onSelect={(make) => {
							fetchCarModels(make)
						}}
					/>
				{/await}
			</div>
			<div class="form-group">
				{#if selected[type].vehicle.make !== ''}
					{#if models && models.length > 0}
						<label for="model">Model of vehicle:</label>
						<SearchableSelectField
							id="model"
							bind:selected={activeVehicle.model}
							items={models}
						/>
					{/if}
				{/if}
			</div>
			{#if selected[type].vehicle.model !== ''}
				<div class="registration-input form-group">
					<label for="registration">Registration number:</label>
					<TextField
						id="registration"
						type="text"
						bind:value={activeVehicle.registration}
						placeholder="Registration number"
					/>
				</div>
			{/if}
		</div>
	{/if}
{/if}

<style>
	.ticket-separate {
		width: 85%;
		margin: 20px auto 0;
		height: 1px;
		background: rgba(34, 40, 59, 0.2);
		border: none;
		order: 1;
		margin: 25px auto;
		width: 100%;
	}

	.ticket-options {
		order: 2;
	}

	.travel-option-select {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	.vehicle-options {
		margin-top: 25px;
		order: 3;
		display: flex;
		gap: 35px;
	}

	.vehicle-options > div {
		gap: 20px;
		flex-basis: calc(100% / 3);
	}

	.registration-input :global(label) {
		line-height: 21px;
	}

	.registration-input :global(input) {
		width: 100%;
		box-sizing: border-box;
		height: 42px;
	}

	.form-group {
		display: flex;
		flex-direction: column;
		gap: 10px;
	}

	/* @TOOD */

	:global(#myDropdown .text-field.textfield) {
		height: 100%;
		border-color: #dbdbdb;
	}

	@media only screen and (max-width: 768px) {
		.travel-option-select {
			width: 100%;
		}
		.ticket-options {
			padding: 20px 20px 0;
		}
	}
</style>
