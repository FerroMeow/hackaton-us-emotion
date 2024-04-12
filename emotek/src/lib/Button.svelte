<script lang="ts">
	import type { HTMLButtonAttributes } from 'svelte/elements';

	interface $$Props extends HTMLButtonAttributes {}
</script>

<button
	class="bg-ecru-700 hover:bg-ecru-600 rounded-lg px-4 py-2 shadow-sm transition-all hover:shadow-xl"
	{...$$restProps}
	on:click|preventDefault
>
	<slot />
</button>
