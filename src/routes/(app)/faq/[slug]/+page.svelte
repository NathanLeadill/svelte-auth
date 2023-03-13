<script lang="ts">
	import { page } from '$app/stores'
	// import type { FaqContent } from '$lib/types/content'
	import content from '../data.json'
	import Panel from './_components/panel.svelte'

	// Wouldn't let me type this the normal way TODO FIX
	const typedContent = content as FaqContent[]
	const filteredContent = typedContent.filter(
		(el) => el.category == $page.params.slug
	)
</script>

<div class="container">
	<div class="faq-help-container">
		<h1>{$page.params.slug}</h1>
		<div class="panels">
			{#each filteredContent as item}
				<Panel {item} />
			{/each}
		</div>

		<div class="helpful-container">
			<span class="helpful-heading"> Was this helpful? </span>
			<p class="helpful-content">
				If not, please take a look among other questions or get in touch with
				customer service.
			</p>
			<a href="/faq#contact-form"><button>Contact customer services</button></a>
		</div>
	</div>
</div>

<style>
	.faq-help-container {
		width: 80%;
		margin: 0 auto;
	}
	.faq-help-container h1 {
		margin: 40px auto 45px;
	}
	h1 {
		text-transform: capitalize;
		font-family: 'Playfair Display';
	}
	.panels {
		display: flex;
		flex-direction: column;
	}

	.helpful-container {
		margin-top: 50px;
		border: 4px solid #2c304e;
		border-radius: 14px;
		padding: 60px 75px;
		display: flex;
		flex-direction: column;
		align-items: center;
		text-align: center;
	}

	.helpful-heading {
		font-family: 'Montserrat';
		font-weight: 700;
		font-size: 18px;
		line-height: 32px;
	}

	.helpful-content {
		font-family: 'Montserrat';
		font-weight: 400;
		font-size: 18px;
		line-height: 28px;
		margin: 20px 0;
	}

	@media only screen and (max-width: 768px) {
		.faq-help-container {
			padding-top: 75px;
		}
		.helpful-container {
			padding: 60px 30px;
		}
	}
</style>
