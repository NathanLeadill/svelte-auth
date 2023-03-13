<script lang="ts">
	import BlueHeadingSection from '../_components/blue-heading-section.svelte'

	let outboundSchedule = [
		{
			day: 'Monday',
			depart: '7:00',
			arrival: '08:45',
		},
		{
			day: 'Wednesday',
			depart: '7:00',
			arrival: '08:45',
		},
		{
			day: 'Friday',
			depart: '7:00',
			arrival: '08:45',
		},
		{
			day: 'Sunday',
			depart: '7:00',
			arrival: '08:45',
		},
	]
	let inboundSchedule = [
		{
			day: 'Monday',
			depart: '19:00',
			arrival: '20:45',
		},
		{
			day: 'Wednesday',
			depart: '19:00',
			arrival: '20:45',
		},
		{
			day: 'Friday',
			depart: '19:00',
			arrival: '20:45',
		},
		{
			day: 'Sunday',
			depart: '19:00',
			arrival: '20:45',
		},
	]
	let outerWidth = 0
</script>

<svelte:window bind:outerWidth />

<div class="page-layout">
	<BlueHeadingSection>
		<h1>Timetables</h1>
	</BlueHeadingSection>
	<div class="timetable-container">
		{#if outerWidth > 768}
			<h1 class="title">Sailing schedule</h1>
			<div class="schedule-card">
				<div class="schedule-grid">
					<!-- HEADER ITEMS"> -->
					<div class="schedule-grid__header__item" />
					<div class="schedule-grid__header__item">Departure</div>
					<div class="schedule-grid__header__item">Arrival</div>
					<div class="schedule-grid__header__item">Departure</div>
					<div class="schedule-grid__header__item">Departure</div>
					<!-- LOCATIONS -->
					<div class="schedule-grid__header__item location" />
					<div class="schedule-grid__header__item location">Malta</div>
					<div class="schedule-grid__header__item location">Ragusa</div>
					<div class="schedule-grid__header__item location">Ragusa</div>
					<div class="schedule-grid__header__item location">Malta</div>
					<!-- </div> -->
					{#each outboundSchedule as item, i}
						<div
							class="schedule-grid__item__item schedule-grid__item__item--day"
						>
							{item.day}
						</div>
						<div class="schedule-grid__item__item">
							{item.depart}
						</div>
						<div class="schedule-grid__item__item">
							{item.arrival}
						</div>
						<div class="schedule-grid__item__item">
							{inboundSchedule[i].depart}
						</div>
						<div class="schedule-grid__item__item">
							{inboundSchedule[i].arrival}
						</div>
					{/each}
				</div>
			</div>
		{:else}
			<h1 class="title">Sailing schedule</h1>
			<div class="route-container">
				<div class="from">Malta</div>
				<div class="icon-and-length">
					<div class="img-container">
						<div />
						<img src="/images/icons/ferry.svg" alt="ferry logo" />
						<div />
					</div>
				</div>
				<div class="to">Ragusa</div>
			</div>
			<div class="sailing-card">
				<div class="heading">
					<div class="heading-label">Depart</div>
					<div class="heading-label">Arrival</div>
				</div>
				<div class="blocks">
					{#each outboundSchedule as item}
						<div class="block">
							<div class="block-heading">{item.day}</div>
							<div class="block-time">{item.depart}</div>
						</div>
						<div class="block">
							<div class="block-heading">{item.day}</div>
							<div class="block-time">{item.arrival}</div>
						</div>
					{/each}
				</div>
			</div>
			<div class="route-container">
				<div class="from">Ragusa</div>
				<div class="icon-and-length">
					<div class="img-container">
						<div />
						<img src="/images/icons/ferry.svg" alt="ferry logo" />
						<div />
					</div>
				</div>
				<div class="to">Malta</div>
			</div>
			<div class="sailing-card">
				<div class="heading">
					<div class="heading-label">Depart</div>
					<div class="heading-label">Arrival</div>
				</div>
				<div class="blocks">
					{#each inboundSchedule as item}
						<div class="block">
							<div class="block-heading">{item.day}</div>
							<div class="block-time">{item.depart}</div>
						</div>
						<div class="block">
							<div class="block-heading">{item.day}</div>
							<div class="block-time">{item.arrival}</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</div>

<style>
	h1 {
		font-family: 'Playfair Display';
		font-style: normal;
		font-weight: 400;
		font-size: 54px;
		line-height: 50px;

		display: flex;
		align-items: center;
		color: #ffffff;
	}
	.title {
		color: black;
		font-size: 40px;
	}
	.schedule-card {
		border: 0.5px solid #c7c7c7;
		border-radius: 16px;
		padding: 50px 80px;
	}
	.schedule-grid {
		display: grid;
		grid-template-columns: 125px 1fr 1fr 1fr 1fr;
		grid-template-rows: 1fr 1fr 1fr 1fr 1fr;
		grid-template-areas:
			'header header header header header'
			'body body body body body';
	}

	.schedule-grid__header__item {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 600;
		font-size: 16px;
		line-height: 29px;
		text-align: center;

		color: #000000;
	}

	.schedule-grid__header__item:not(.location) {
		padding: 10px 50px;
	}

	.schedule-grid__header__item.location {
		padding: 30px 0 10px;
		border-top: 2px solid #22283b;
	}
	.schedule-grid__item__item {
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 20px 0;
		border-bottom: 1px solid rgba(34, 40, 59, 0.4);
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 500;
		line-height: 29px;

		color: #000000;
	}

	.schedule-grid__item__item:nth-child(5n + 3),
	.schedule-grid__header__item:nth-child(8) {
		border-right: 1px solid rgba(34, 40, 59, 0.4);
	}

	.schedule-grid__item__item:nth-child(1n + 26) {
		border-bottom: 2px solid;
	}
	.schedule-grid__item__item--day {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 500;
		font-size: 18px;
		line-height: 29px;
		justify-content: flex-start;
		color: #000000;
	}

	@media only screen and (max-width: 768px) {
		.timetable-container {
			width: 100%;
			margin-bottom: 50px;
		}
		.heading {
			display: flex;
			justify-content: space-between;
			border-bottom: 2px solid rgba(34, 40, 59, 0.8);
			padding-bottom: 24px;
		}
		.heading-label {
			font-family: 'Montserrat';
			font-style: normal;
			font-weight: 600;
			font-size: 20px;
			line-height: 24px;
			text-align: center;
			color: #000000;
		}
		.route-container {
			display: flex;
			justify-content: center;
			padding-bottom: 25px;
			margin-top: 50px;
		}
		.route-container .from,
		.route-container .to {
			font-family: 'Montserrat';
			font-style: normal;
			font-weight: 600;
			font-size: 20px;
			line-height: 24px;
			text-align: center;

			color: #000000;
		}

		.icon-and-length {
		}
		.img-container {
			display: flex;
			align-items: center;
			width: 125px;
			margin: 0 15px;
		}
		.img-container div {
			height: 2px;
			background: black;
			width: 100%;
		}
		.img-container img {
			height: 20px;
			margin: 0 10px;
		}

		.sailing-card {
			border: 0.5px solid #c7c7c7;
			border-radius: 16px;
			padding: 28px 25px;
		}
		.blocks {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}
		.block {
			display: flex;
			flex-direction: column;
			align-items: center;
			padding: 22px 0;
			border-bottom: 0.5px solid rgba(34, 40, 59, 0.8);
		}
		.block:nth-of-type(odd) {
			border-right: 0.5px solid rgba(34, 40, 59, 0.8);
		}
		.block-heading {
			font-family: 'Montserrat';
			font-style: normal;
			font-weight: 400;
			font-size: 18px;
			line-height: 22px;
			text-align: center;
			color: #000000;
		}
		.block-time {
			font-family: 'Montserrat';
			font-style: normal;
			font-weight: 500;
			font-size: 20px;
			line-height: 24px;
			color: #000000;
		}
	}
</style>
