<script lang="ts">
	import type { ScheduleType } from '$lib/types/schedules';
	import { getDateTimeWithoutTimezone, getLocationById } from '$lib/utils/helper';

	export let originId: number;
	export let schedule: ScheduleType;
	function timeStringToFloat(time: string) {
		var hoursMinutes = time.split(/[.:]/);
		var hours = parseInt(hoursMinutes[0], 10);
		var minutes = hoursMinutes[1] ? parseInt(hoursMinutes[1], 10) : 0;
		return hours + minutes / 60;
	}

	function convertFloatToTimeString(time: number) {
		var hours = Math.floor(time);
		var minutes = Math.floor((time - hours) * 60);
		return hours + ':' + minutes;
	}
	function calculateJourneyDuration(type: string) {
		const outboundDuration = timeStringToFloat(schedule.arrival_time);
		const inboundDuration = timeStringToFloat(schedule.departure_time);
		return convertFloatToTimeString(Number(outboundDuration - inboundDuration));
	}
</script>

{#if schedule}
	<div class="journey-card">
		<div class="journey-route">
			<div class="journey-outbound">
				<p class="location">
					{getLocationById(originId)}
				</p>
			</div>

			<div class="gap" />
			<div class="journey-inbound">
				<p class="location">
					{getLocationById(originId === 7 ? 8 : 7)}
				</p>
			</div>
		</div>
		<div class="times-and-image">
			<div class="journey-outbound">
				<p class="time">
					{schedule.departure_time}
				</p>
			</div>
			<div class="icon-and-length">
				<div class="img-container">
					<div />
					<img src="/images/icons/ferry.svg" alt="ferry logo" />
					<div />
				</div>
			</div>
			<div class="journey-inbound">
				<p class="time">
					{schedule.arrival_time}
				</p>
			</div>
		</div>
		<div class="active-schedule">
			<div class="date">
				{getDateTimeWithoutTimezone(schedule.travel_date).toLocaleDateString('en-GB', {
					day: 'numeric',
					month: 'short',
					year: 'numeric'
				})}
			</div>
			<div class="row">
				<p class="duration-label">
					{calculateJourneyDuration('outbound').split(':')[0]}h {calculateJourneyDuration(
						'outbound'
					).split(':')[1]}m
				</p>
			</div>
			<div class="date">
				{getDateTimeWithoutTimezone(schedule.travel_date).toLocaleDateString('en-GB', {
					day: 'numeric',
					month: 'short',
					year: 'numeric'
				})}
			</div>
		</div>
	</div>
{/if}

<style>
	.journey-route {
		display: flex;
		align-items: center;
	}

	.journey-route > div {
		flex-basis: 33.33%;
		text-align: center;
	}

	.active-schedule {
		display: flex;
		flex-direction: row;
		align-items: center;
	}
	.active-schedule > div {
		flex-basis: 33.33%;
		text-align: center;
	}

	.img-container {
		display: flex;
		align-items: center;
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
	.journey-route .journey-outbound {
		flex-basis: 33.33%;
	}

	.journey-outbound,
	.journey-inbound {
		text-transform: capitalize;
	}

	.journey-route .location {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 400;
		font-size: 18px;
		line-height: 14px;
		color: #000000;
	}

	.active-schedule {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.active-schedule > div {
		font-family: 'Montserrat';
		font-size: 20px;
		font-weight: 400;
	}
	.duration-label {
		font-size: 15px;
	}
	.times-and-image {
		display: flex;
		align-items: center;
	}
	.times-and-image > div {
		flex-basis: 33.33%;
		text-align: center;
	}

	p.time {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 600;
		font-size: 24px;
		line-height: 14px;
		margin: 0;

		color: #000000;
	}

	.active-schedule .date {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 400;
		font-size: 16px;
		line-height: 16px;
		letter-spacing: 0.12px;

		color: #121212;
	}

	@media only screen and (max-width: 768px) {
		.journey-route .journey-outbound .location,
		.times-and-image .journey-outbound .time,
		.active-schedule .date:first-child {
			text-align: start;
		}

		.journey-route .journey-inbound .location,
		.times-and-image .journey-inbound .time,
		.active-schedule .date:last-child {
			text-align: end;
		}

		.active-schedule .date {
			font-size: 15px;
		}
	}
</style>
