<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	let isBegin: bool = false;

	function startTest() {
		isBegin = true;
	}
</script>

<h3>Rozpocznij test</h3>
<button on:click|once={startTest}>Rozpocznij</button>

<div>
	{#if isBegin}{/if}
</div>
