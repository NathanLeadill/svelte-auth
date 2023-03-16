<script lang="ts">
	import JourneyCard from '$lib/components/journey-card.svelte'
	import type { ScheduleSelectedObj } from '$lib/types/schedules'
	import TicketType from './ticket-type.svelte'
	export let schedule: ScheduleType
	export let type: JourneyType
	export let journey: ScheduleType[]
	// import { bookTrip, type JourneyType } from '$lib/utils/stores'
	let expanded = false
	export let selected: Partial<ScheduleSelectedObj> = {
		outbound: {
			train_id: 0,
			schedule_id: 0,
			product_id: 0,
			vehicle: {
				id: 0,
				make: '',
				model: '',
				registration: '',
			},
		},
		inbound: {
			train_id: 0,
			schedule_id: 0,
			product_id: 0,
		},
	}
	export let test: Partial<ScheduleSelectedObj> = {
		outbound: {
			train_id: 0,
			schedule_id: 0,
			product_id: 0,
			vehicle: {
				id: 0,
				make: '',
				model: '',
				registration: '',
			},
		},
	}

	function closeMenuKeyboard(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			expanded = false
		}
	}

	const selectInd = selected[type as keyof typeof selected]
</script>

{#if !schedule}
	<p>Loading</p>
{:else}
	<div class="time-slot">
		<div
			class="heading"
			on:click={() => (expanded = !expanded)}
			on:keydown={closeMenuKeyboard}
		>
			<div class="arrival-column">
				<JourneyCard {schedule} originId={schedule.origin_id} />
			</div>
			<div class="price-column">
				<div class="price-box">
					<p class="from-label">From</p>
					<p class="price-label">€ 100.00</p>
				</div>
			</div>
		</div>
		<div class="time-slot-body" class:expanded>
			<div class="ticket-slots">
				{#each schedule.products as product, i}
					<!-- CHANGE SELECTED ROUTE GETTING LATE WANTED TO SLEEP -->
					<TicketType
						{product}
						trainId={schedule.train_id}
						scheduleId={schedule.schedule_id}
						ticketId={product.id}
						{type}
						{selected}
						bind:group={selected}
					/>
				{/each}
			</div>
		</div>
		<div class="vehicle-section">
			<!-- <VehicleInputs
				{selected}
				{schedule}
				bind:activeVehicle={selected[type].vehicle}
			/> -->
		</div>
	</div>
{/if}

<style>
	.time-slot {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		/* background: lightgray; */
		border-radius: 32px;
		border: 0.5px solid #c7c7c7;
		margin: 10px 0 20px 0px;
		padding-bottom: 37px;
		gap: 16px;
		background: white;
	}

	.heading {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 47px 57px 0 57px;
		gap: 16px;
		border-radius: 32px;
		border-bottom-left-radius: 10px;
		border-bottom-right-radius: 10px;
		background-color: white;
		order: 1;
	}

	.heading.expanded {
		border-bottom-left-radius: 32px;
		border-bottom-right-radius: 32px;
	}

	.heading.expanded .price-box {
		background: #22283b;
		color: white;
	}

	.heading.expanded .price-box .from-label {
		color: white;
	}

	.heading:hover {
		cursor: pointer;
	}

	.heading.activeTicket .price-box,
	.heading.activeTicket .price-box .from-label {
		background: #22283b;
		color: white;
	}

	.arrival-column {
		flex-grow: 1;
	}

	.arrival-column {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		font-family: 'Montserrat';
		line-height: 32px;
	}

	.ticket-separate {
		width: 85%;
		margin: 20px auto 0;
		height: 0.5px;
		background: rgba(34, 40, 59, 0.5);
		border: none;
		order: 3;
	}

	.time-slot-body {
		display: flex;
		flex-direction: column;
		padding: 5px 50px;
		gap: 16px;
		order: 2;
		display: none;
	}

	.time-slot-body.expanded {
		display: block;
	}

	.ticket-slots {
		display: flex;
		flex-direction: column;
		gap: 24px;
	}

	.price-column .price-box {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 4px;
		background: #f8f8f8;
		padding: 25px 42px;
		border-radius: 16px;
		position: relative;
	}
	.price-box p {
		margin: 0;
	}
	.price-box:hover {
		background-color: var(--snowfall-blue);
	}

	.price-box:hover p {
		color: white;
	}

	.price-box::after {
		content: '';
		background-image: url('/images/icons/arrow-up.svg');
		background-size: 11px;
		-webkit-transform: rotate(180deg);

		background-repeat: no-repeat;
		font-size: 15px;
		font-weight: 400;
		margin-left: 5px;
		display: block;
		position: absolute;
		height: 11px;
		width: 11px;
		right: 20px;
		bottom: 35px;
	}

	.from-label {
		font-family: 'Montserrat';
		font-weight: 400;
		font-size: 15px;
		color: #000;
	}

	.price-label {
		font-size: 24px;
		font-weight: 700;
		letter-spacing: 0.1px;
	}
	.vehicle-section {
		display: flex;
		flex-direction: row;
		flex-direction: column;
		padding: 0 76px;
		order: 4;
	}
	/* @TOOD */

	:global(#myDropdown .text-field.textfield) {
		height: 100%;
		border-color: #dbdbdb;
	}
	.vehicle-options {
		box-sizing: border-box;
		order: 4;
		padding: 0 76px;
		width: 100%;
		display: grid;
		grid-template-columns: 1fr 1fr 1fr;
		gap: 40px 20px;
	}

	.vehicle-options :global(.dropdown-content) {
		border: none;
	}

	.vehicle-options :global(.dropdown-content input) {
		width: unset;
	}

	@media only screen and (max-width: 768px) {
		.heading {
			padding: 25px 20px 0;
		}
		.time-slot {
			padding-bottom: 0;
		}
		.price-column {
			display: none;
			margin: 0 auto;
		}
		.pricing-panel {
			order: 5;
			background: #f8f8f8;
			border: 0.5px solid rgba(64, 82, 91, 0.1);
			padding: 22px 25px;
			display: flex;
			border-bottom-left-radius: 30px;
			border-bottom-right-radius: 30px;
			align-items: center;
		}
		.pricing-panel.expanded {
			border-radius: 0;
		}
		.from-label {
			flex-grow: 1;
			font-family: 'Montserrat';
			font-style: normal;
			font-weight: 400;
			font-size: 18px;
			line-height: 32px;
			display: flex;
			align-items: center;
			color: #22283b;
		}
		.price-label {
			font-family: 'Montserrat';
			font-style: normal;
			font-weight: 500;
			font-size: 18px;
			line-height: 24px;
			text-align: right;
			color: #22283b;
		}
		.price-label span {
			font-weight: 700;
			font-size: 24px;
		}
		.vehicle-options {
			padding: 0 20px;
			display: flex;
			flex-direction: column;
			box-sizing: border-box;
			width: 100%;
			margin: 0 auto;
			gap: 15px;
		}
		.vehicle-options :global(.autocomplete) {
			width: 100%;
		}
		.vehicle-options :global(.autocomplete input) {
			box-sizing: border-box;
		}

		.vehicle-options :global(div input) {
			width: 100%;
			box-sizing: border-box;
			height: 42px;
		}
		.vehicle-options div {
			grid-column: 1 / 3;
		}
		.travel-option-select {
			width: 100%;
		}
		.time-slot-body {
			order: 6;
			padding: 5px 20px 22px;
		}
		.ticket-slots {
			gap: 20px;
		}
		.ticket-options {
			padding: 20px 20px 0;
		}
	}
</style>
