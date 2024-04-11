<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	export let id: string;
	export let value = '';

	interface $$Props extends HTMLInputAttributes {
		id: string;
		value?: string;
	}
</script>

<div>
	<p>
		<label for={id}><slot /></label>
	</p>
	<p>
		<input
			name={id}
			{id}
			class="bg-ecru-900 rounded-lg px-4 py-2 shadow-sm"
			bind:value
			{...$$restProps}
		/>
	</p>
</div>
