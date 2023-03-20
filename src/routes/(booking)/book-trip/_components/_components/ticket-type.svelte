<script lang="ts">
	import type { ScheduleSelectedObj, TicketProduct } from '$lib/types/schedules'

	export let product: TicketProduct
	export let train_id: number
	export let schedule_id: number
	export let product_id: number
	export let type: keyof typeof group
	export let group: ScheduleSelectedObj
	export let selected: Partial<ScheduleSelectedObj>
	/**
	 * class:active={schedule_id === selected[type].schedule_id &&
			ticketId === selected[type].ticketId}
	*/
</script>

<label class="label">
	<input
		type="radio"
		value={{
			...selected[type],
			train_id,
			schedule_id,
			product_id,
		}}
		bind:group={group[type]}
	/>
	<div
		class="ticket"
		class:active={selected &&
			selected[type] &&
			selected[type].schedule_id === schedule_id &&
			selected[type].product_id === product_id}
	>
		<span class="ticket-type-heading">{product.name}</span>
		<p class="ticket-type-description">{product.description}</p>
		<p class="ticket-type-price">
			<span class="currency" />
			€ {Number(product.price).toFixed(2)}
		</p>
	</div>
</label>

<style>
	input {
		width: 5%;
	}

	.ticket {
		display: flex;
		flex-direction: row;
		gap: 20px;
		background: #f8f8f8;
		align-items: center;
		border-radius: 8px;
		padding: 19px 21px;
	}

	.ticket.active {
		background-color: var(--snowfall-blue);
		color: white;
	}

	.ticket.active p,
	.ticket.active span {
		color: white;
	}

	.ticket:hover {
		cursor: pointer;
		background-color: var(--snowfall-blue);
		color: white;
	}

	.ticket:hover p,
	.ticket:hover span {
		color: white;
	}

	.ticket-type-heading {
		font-size: 1.3rem;
		font-weight: 700;
		font-family: 'Montserrat';
		color: #5e5e5e;
		text-transform: lowercase;
	}

	.ticket-type-heading::first-letter {
		text-transform: uppercase;
	}
	.ticket-type-description {
		flex-grow: 1;
		font-family: 'Montserrat';
		font-size: 15px;
		color: black;
		margin: 0;
	}

	.ticket-type-price {
		font-size: 20px;
		font-family: 'Montserrat';
		font-weight: 500;
		color: black;
		margin: 0 38px 0 0;
		position: relative;
	}

	.currency {
		font-size: 1.4rem;
		font-weight: 800;
		color: #5e5e5e;
	}

	.label {
		display: block;
		width: 100%;
	}
	.label > input {
		/* HIDE RADIO */
		visibility: hidden; /* Makes input not-clickable */
		position: absolute; /* Remove input from document flow */
		width: 100%;
	}
	.label > input + div {
		/* DIV STYLES */
		cursor: pointer;
		border: 2px solid transparent;
	}
	.label > input:checked + div {
		/* (RADIO CHECKED) DIV STYLES */
		background-color: #22283b;
		color: white;
	}
	.label > input:checked + .ticket p,
	.label > input:checked + .ticket span {
		color: white;
	}

	@media only screen and (max-width: 768px) {
		.ticket {
			flex-direction: row;
			flex-wrap: wrap;
		}
		.ticket-type-heading {
			order: 1;
			flex-grow: 1;
		}
		.ticket-type-description {
			order: 3;
			flex-basis: 100%;
			font-family: 'Montserrat';
			font-style: normal;
			font-weight: 400;
			font-size: 12px;
			line-height: 21px;

			color: #000000;
		}
		.ticket-type-price {
			order: 2;
			margin: 0;
		}

		.label input {
			max-width: 100px;
		}
	}
</style>
