<script lang="ts">
	import { browser } from '$app/environment'
	import { goto } from '$app/navigation'
	import SearchBox from '$lib/components/search-box.svelte'
	import type { SearchOptions } from '$lib/types/destination'
	import Swal from 'sweetalert2'

	async function submitSearchForJourney(inputOptions: SearchOptions) {
		console.log('input', inputOptions)

		const departureDate = new Date(inputOptions.date.depart)
		const returnDate = new Date(inputOptions.date.return)

		const tzOffsetD = departureDate.getTimezoneOffset() * 60000
		const tzOffsetR = returnDate.getTimezoneOffset() * 60000
		const tzOffset = inputOptions.returnTrip ? tzOffsetR : tzOffsetD

		if (
			departureDate.getTime() < new Date().getTime() ||
			inputOptions.location.from === ''
		) {
			Swal.fire({
				title: 'Error!',
				text: 'Please fill in all the fields',
				icon: 'error',
				confirmButtonText: 'Ok',
			})
			return
		}
		console.log('Tz Offset', tzOffset)

		console.log('departureDate', departureDate)
		console.log(
			'Other',
			new Date(departureDate.getTime() - tzOffset)
				.toISOString()
				.split('T')
				.slice(0, -1)
		)

		const searchObject = {
			directions: [
				'outbound',
				...(inputOptions.returnTrip ? ['inbound'] : []),
			].join(','),
			origin: inputOptions.location.from.toLocaleLowerCase(),
			passengers: JSON.stringify(inputOptions.passengers),
			outboundDate: new Date(departureDate.getTime() - tzOffset).toISOString(),
			inboundDate: new Date(returnDate.getTime() - tzOffset).toISOString(),
		}

		if (browser) {
			goto('/book-trip', {
				state: {
					...searchObject,
				},
			})
		}
	}
</script>

<div class="hero-container">
	<!-- <div class="overlay" /> -->
	<video src="/videos/hero_new.mp4" autoplay loop muted playsinline />
	<div class="content-container">
		<h1 class="hero-title">Travel made easier</h1>
		<h3 class="hero-tag">Your trip starts here with faster travel</h3>
		<div class="searchbox-box" id="book-trip">
			<SearchBox onSubmit={submitSearchForJourney} />
		</div>
	</div>
</div>

<style>
	@import url('https://fonts.googleapis.com/css?family=Open+Sans:600,800|Droid+Serif:400,400italic');
	* {
		font-family: inherit;
		box-sizing: border-box;
	}
	.hero-container {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 550px;
		position: relative;
		z-index: 1;
	}
	video {
		position: absolute;
		top: 0;
		left: 0;
		display: block;
		width: 100%;
		height: 550px;
		-o-object-fit: cover;
		object-fit: cover;
	}
	.hero-title {
		text-transform: uppercase;
		color: #fff;
		font-size: 24px;
		position: relative;
		margin-top: 0;
		font-weight: 300;
		letter-spacing: 0.13rem;
		text-align: center;
	}
	.hero-tag {
		width: 35%;
		text-align: center;
		line-height: 80px;
		font-family: 'Playfair Display';
		font-size: 62px;
		font-weight: 400;
		color: white;
		margin: 30px auto 0;
	}
	.searchbox-box {
		margin: 80px auto 0;
		position: relative;
		top: 30px;
		width: 85%;
	}
	.content-container {
		margin-top: 150px;
		position: relative;
		width: 75%;
	}

	/* Create media queries */
	@media only screen and (max-width: 1604px) {
		.content-container {
			margin-top: 200px;
		}
		.hero-tag {
			width: 65%;
		}
	}

	@media only screen and (max-width: 768px) {
		.hero-container {
			height: 650px;
		}
		video {
			height: 650px;
		}
		.hero-title {
			font-size: 20px;
			line-height: 54px;
			letter-spacing: 5px;
		}
		.hero-tag {
			width: 100%;
			font-size: 45px;
			line-height: 60px;
		}
		.content-container {
			margin-top: 300px;
			width: 95%;
		}
		.searchbox-box {
			margin-top: 35px;
			width: 95%;
		}
	}
</style>
