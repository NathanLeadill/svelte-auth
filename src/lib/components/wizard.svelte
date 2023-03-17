<script lang="ts">
	import { goto } from '$app/navigation'
	import { page } from '$app/stores'
	import { bookingState } from '$lib/utils/stores'

	type TSteps = $$Generic<Record<string, string>>
	type TValue = Readonly<keyof TSteps>

	export let steps: TSteps
	export let value: TValue | undefined
	export let urlNavigation = false
	export let queryParamKey = 'step'

	$: ids = Object.keys(steps)
	$: idCount = ids.length
	$: activeIndex = ids.indexOf(value as string)
	$: queryParamStep = urlNavigation
		? $page.url.searchParams.get(queryParamKey)
		: undefined

	$: if (queryParamStep) {
		const id = queryParamStep

		if (ids.indexOf(id) === -1) {
			value = ids[0]
		} else {
			value = id
		}
	} else {
		value = ids[0]
	}

	function navigate(): void {
		if (urlNavigation) {
			const nextUrl = new URL($page.url)

			if (value === ids[0]) {
				nextUrl.searchParams.delete(queryParamKey)
			} else {
				nextUrl.searchParams.set(queryParamKey, value as string)
			}

			goto(nextUrl.toString())
		}
	}

	function goToNextWithNewState(state): void {
		value = ids[Math.min(idCount - 1, activeIndex + 1)]

		if (urlNavigation) {
			const nextUrl = new URL($page.url)

			if (value === ids[0]) {
				nextUrl.searchParams.delete(queryParamKey)
			} else {
				nextUrl.searchParams.set(queryParamKey, value as string)
			}

			goto(nextUrl.toString(), {
				replaceState: true,
				state: state,
			})
		}
	}

	function goToNext(): void {
		value = ids[Math.min(idCount - 1, activeIndex + 1)]

		navigate()
	}

	function goToPrevious(): void {
		value = ids[Math.max(0, activeIndex - 1)]

		navigate()
	}
</script>

<pre>
    {JSON.stringify($bookingState)}
</pre>

<div class="wizard">
	<div class="header-bar">
		<a href="/">
			<div class="logo">
				<img src="/images/ragusa-logo.png" alt="logo" />
			</div>
		</a>
		<div class="steps">
			{#each ids as id, idx}
				<span
					class="step"
					class:active={id === value}
					class:completed={activeIndex > idx}
				>
					<span class="circle">
						<div class="id-no">
							{idx + 1}
						</div>
					</span>
					<strong>{steps[id]}</strong>
				</span>
			{/each}
		</div>
	</div>

	<slot {value} steps={Object.keys(steps)} {goToNext} {goToPrevious} />
</div>

<style>
	.header-bar {
		display: flex;
		margin-bottom: 60px;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		background: white;
		padding: 28px;
		padding-left: 100px;
		gap: 125px;
		z-index: 9999;
		box-sizing: border-box;
	}
	.steps {
		display: flex;
		width: 75%;
	}

	.step {
		align-items: center;
		color: var(--color-orange);
		display: flex;
		flex: 1 1 0;
		flex-flow: row;
		gap: 12px;
		justify-content: flex-start;
		position: relative;
		transition: color var(--speed-fast) ease;
	}

	.step::after,
	.step::before {
		border-bottom: var(--color-orange) 2px solid;
		content: '';
		display: block;
		position: absolute;
		top: 16px;
		transition: border-color var(--speed-fast) ease;
		width: calc(50% - 17px);
	}

	.step::after {
		right: 0;
	}

	.step::before {
		left: 0;
	}

	.step:first-child::before,
	.step:last-child::after {
		display: none;
	}

	.step > span {
		align-items: center;
		background-color: var(--color-white);
		border: var(--color-orange) 2px solid;
		border-radius: 50%;
		display: flex;
		height: 34px;
		justify-content: center;
		transition: background-color var(--speed-fast) ease,
			border-color var(--speed-fast) ease;
		width: 34px;
	}

	.step.completed > span {
		background-color: #22283b;
	}

	.step.active {
		color: var(--color-orange);
		font-weight: 500;
	}

	.step.active > span {
		border-color: var(--color-orange);
	}

	.step > strong {
		text-align: center;
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 600;
		font-size: 14px;
		line-height: 17px;
		color: #22283b;
	}

	.step.active ~ .step > strong {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 400;
		font-size: 14px;
		line-height: 17px;
		color: #454444;
	}

	.step.active ~ .step > span {
		border: 2px solid #eaeaea;
	}

	.step.step.active ~ .step > span .id-no {
		background: none;
		font-style: normal;
		font-weight: 500;
		font-size: 12px;
		line-height: 15px;
		color: #454444;
	}

	.step.active::after,
	.step.active ~ .step::after,
	.step.active ~ .step::before {
		border-color: black;
	}

	.step .circle {
		border-radius: 50%;
		background: white;
		border: 2px solid #22283b;
	}

	.step .circle .id-no {
		background: #22283b;
		border-radius: 50%;
		width: 22px;
		height: 22px;
		color: white;
		font-size: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	@media only screen and (max-width: 768px) {
		.header-bar {
			/* max-width: -webkit-fill-available; */
			display: none;
		}
		.logo {
			display: none;
		}
		.steps {
			width: 100%;
		}
		.step {
			width: auto;
			flex: unset;
		}
		.step > strong {
			display: none;
		}
		.step.active > strong {
			display: block;
		}
	}
</style>
