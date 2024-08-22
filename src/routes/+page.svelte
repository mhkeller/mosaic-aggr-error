<script>
	import { onMount } from 'svelte';

	import athletesChart from '$lib/athletesChart.js';

	let chartElement = $state();

	onMount(async () => {
		const chart = await athletesChart();

		chartElement.appendChild(chart);
	});
</script>

<div class="container">
	<div bind:this={chartElement} />
</div>

<style>
	.container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
	}
</style>
