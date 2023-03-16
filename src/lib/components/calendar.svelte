<script lang="ts">
	import clickOutside from '$lib/actions/click-outside'
	import TextField from '$lib/components/text-field.svelte'
	import { onMount } from 'svelte'

	export let disabledDays: number[] = []
	export let dateLabel: string
	export let placeholder = ''
	export let parts = ''

	// @TODO TIDY UP

	let dateValue = new Date()
	let expanded = false

	function toggleCalendar() {
		expanded = !expanded
	}

	function setActiveMonth(currentDate: Date, modifier: number) {
		const today = new Date()
		const curr = new Date(
			new Date(currentDate).getFullYear(),
			new Date(currentDate).getMonth() + modifier,
			new Date(currentDate).getDate()
		)

		if (modifier === -1 && curr.getTime() < today.getTime()) {
			return
		}
		dateValue = new Date(
			currentDate.setMonth(currentDate.getMonth() + modifier)
		)
	}

	function setActiveDay(day: number) {
		dateLabel = new Date(
			dateValue.getFullYear(),
			dateValue.getMonth(),
			day
		).toLocaleDateString('en-GB', {
			day: 'numeric',
			// weekday: 'short',
			month: 'long',
			year: 'numeric',
		})

		// This is to solve the timezone stuff
		const dateTimeFormat = new Intl.DateTimeFormat('en-US', {
			day: 'numeric',
			month: 'numeric',
			year: 'numeric',
		}).formatToParts(new Date(dateLabel))
		const [month, date, year] = [
			dateTimeFormat[0].value,
			dateTimeFormat[2].value,
			dateTimeFormat[4].value,
		]
		console.log('Date', month, date, year)
		parts = `${year}/${month}/${date}`
		dateLabel = new Date(parts)

		expanded = !expanded
	}

	function getDaysInMonth() {
		const daysInMonth = new Date(
			dateValue.getFullYear(),
			dateValue.getMonth() + 1,
			0
		).getDate()
		return daysInMonth
	}

	function checkDayDisabled(dateOfMonth: number) {
		const day = new Date(
			dateValue.getFullYear(),
			dateValue.getMonth(),
			dateOfMonth
		).getDay()
		// if dateOfMonth is before today, disable it
		const today = new Date()
		const curr = new Date(
			new Date(dateValue).getFullYear(),
			new Date(dateValue).getMonth(),
			dateOfMonth
		)
		if (curr.getTime() < today.getTime()) {
			return true
		}
		return disabledDays.includes(day)
	}

	onMount(() => {
		disabledDays.includes(dateValue.getDay()) &&
			setActiveDay(dateValue.getDate() + 1)
		expanded = false
	})

	$: monthStartOffset = new Date(
		dateValue.getFullYear(),
		dateValue.getMonth(),
		1
	).getDay()
	$: dateFieldLabel = new Date(dateLabel).toLocaleDateString('en-US', {
		day: 'numeric',
		weekday: 'short',
		month: 'long',
		year: 'numeric',
	})
</script>

<div
	class="calendar-container"
	use:clickOutside={() => {
		if (expanded) toggleCalendar()
	}}
>
	<TextField
		value={dateLabel ? dateFieldLabel : placeholder}
		on:focus={toggleCalendar}
		placeholder={'Please enter a date'}
	/>

	{#if expanded}
		<div class="calendar-block">
			<div class="info-heading">
				<div
					class="info-heading-item"
					on:click={() => {
						setActiveMonth(dateValue, -1)
					}}
				>
					{'<'}
				</div>
				<div class="info-heading-item month-label">
					{dateValue.toLocaleString('default', {
						month: 'long',
					})}
				</div>
				<div
					class="info-heading-item"
					on:click={() => {
						setActiveMonth(dateValue, 1)
					}}
				>
					{'>'}
				</div>
			</div>
			<div class="heading">
				<div class="heading-item">Sun</div>
				<div class="heading-item">Mon</div>
				<div class="heading-item">Tues</div>
				<div class="heading-item">Wed</div>
				<div class="heading-item">Thu</div>
				<div class="heading-item">Fri</div>
				<div class="heading-item">Sat</div>
			</div>
			<div class="calendar">
				{#each Array.from({ length: getDaysInMonth() + monthStartOffset }, (_, i) => i) as i}
					<div>
						{#if i < monthStartOffset}
							<div class="empty" />
						{:else}
							<div
								class="calendar-item"
								class:active={Number(i - (monthStartOffset - 1)) ===
									new Date(dateLabel).getDate() &&
									dateValue.getMonth() === new Date(dateLabel).getMonth() &&
									dateValue.getFullYear() === new Date(dateLabel).getFullYear()}
								class:disabled={checkDayDisabled(i - (monthStartOffset - 1))}
								on:click={() => {
									setActiveDay(i - (monthStartOffset - 1))
								}}
							>
								{i - (monthStartOffset - 1)}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.calendar-container :global(.text-field) {
		box-sizing: border-box;
		width: 100%;
		height: 42px;
		margin-top: 2px;
		border-color: #f4f4f5;
		background: #f4f4f5;
	}
	.calendar-block {
		display: flex;
		flex-direction: column;
		/* gap: 10px; */
		/* padding: 10px; */
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
		transition: opacity 1s ease-in-out, visibility 0.2s ease-in-out;
		width: min-content;
		position: absolute;
	}
	.info-heading {
		display: flex;
		justify-content: space-between;
		padding: 10px;
		align-items: center;
		background: #22283b;
		color: white;
	}
	.info-heading .info-heading-item:not(.month-label) {
		color: white;
	}
	.heading {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		padding: 10px;
	}

	.calendar {
		padding: 10px;
	}
	.heading-item {
		padding: 10px;
		font-weight: 600;
		width: 30px;
	}

	.month-label {
		font-weight: 600;
	}

	.info-heading-item {
		padding: 10px;
	}

	.info-heading-item:not(.month-label) {
		color: #000;
		border-radius: 50%;
		height: 20px;
		width: 20px;
		text-align: center;
		font-weight: 700;
		font-family: 'Montserrat';
	}

	.info-heading-item:not(.month-label):hover {
		cursor: pointer;
		background-color: #cdcdcd8f;
	}

	.calendar {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
	}

	.calendar-item {
		padding: 15px;
		text-align: center;
		font-family: 'Montserrat';
	}

	.calendar .calendar-item:hover,
	.calendar .calendar-item.active {
		cursor: pointer;
		background-color: #22283b;
		color: #fff;
		/* border-radius: 50%; */
		font-weight: 700;
	}
	.calendar .calendar-item.disabled {
		color: #ccc;
		pointer-events: none;
	}

	.empty {
		height: 100%;
		background: #f4f4f5;
	}

	:global(#myDropdown input.text-field.text-field) {
		width: unset;
	}

	@media only screen and (max-width: 768px) {
		.calendar-block {
			position: absolute;
			left: 0;
			width: 100%;
		}
		.calendar-block .heading {
			padding: 0;
		}

		.calendar-block .heading .heading-item {
			padding: 10px 5px;
			text-align: center;
			width: 100%;
		}
	}
</style>
