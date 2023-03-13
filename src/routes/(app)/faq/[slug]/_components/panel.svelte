<script lang="ts">
	// TEMP PLACE
	type ItemType = {
		title: string
		content: string
	}

	export let item: ItemType

	let expanded = false

	function toggle() {
		expanded = !expanded
	}
</script>

<div class="panel">
	<div class="panel-heading" on:click={toggle}>
		<span>{item.title}</span>
		<img
			class="down-arrow-icon"
			src="/images/icons/panel-arrow.svg"
			alt=" down"
		/>
	</div>
	{#if expanded}
		<div class="panel-body">
			<p class="text-content">{item.content.replaceAll('_', '\r\n')}</p>
		</div>
	{/if}
</div>

<style>
	.panel {
		border-bottom: 1px solid #e7e7e7;
	}
	.panel-heading {
		display: flex;
		padding: 7.5px 0;
	}
	.panel-heading span {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 600;
		font-size: 24px;
		line-height: 55px;
		color: #000000;
		flex-grow: 1;
	}
	.down-arrow-icon {
		margin-top: 20px;
		transform: rotate(180deg);
	}

	.text-content {
		font-family: 'Montserrat';
		font-style: normal;
		font-weight: 400;
		font-size: 18px;
		line-height: 32px;
		color: #000000;
		white-space: break-spaces;
		width: 90%;
	}
	.panel-heading:hover {
		cursor: pointer;
	}
	@media only screen and (max-width: 768px) {
		.panel {
			padding: 12px 0;
		}
		.panel-heading span {
			font-size: 22px;
			line-height: 35px;
		}
	}
</style>
