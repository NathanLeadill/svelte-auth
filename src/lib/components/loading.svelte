<script lang="ts">
	export let progress = false
</script>

<div class="donut" />
{#if progress}
	<div class="progress-bar">
		<div class="progress-bar-filled" style="width: 50%" />
	</div>
{/if}

<style>
	.donut {
		display: inline-block;
		border: 4px solid rgba(0, 0, 0, 0.1);
		border-left-color: #22283b;
		border-radius: 50%;
		width: 30px;
		height: 30px;
		animation: donut-spin 1.2s linear infinite;
	}

	.progress-bar {
		height: 20px;
		width: 100%;
		background-color: #ddd;
		border-radius: 5px;
		overflow: hidden;
	}

	.progress-bar-filled {
		height: 100%;
		background-color: #22283b;
		border-radius: inherit;
		transition: width 0.25s ease-in-out;
		animation: progress-loading 1.2s linear infinite;
	}

	@keyframes donut-spin {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
	}

	@keyframes progress-loading {
		0% {
			width: 0;
		}
		100% {
			width: 100%;
		}
	}
</style>
