<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	type SelectOption = {
		value: string;
		name: string;
	};

	export let id: string;
	export let options: SelectOption[];
	export let value = '';

	interface $$Props extends HTMLInputAttributes {
		id: string;
		value?: string;
		options: SelectOption[];
	}
</script>

<div>
	<p>
		<label for={id}> </label>
	</p>
	<p>
		<select
			{id}
			name={id}
			bind:value
			class="bg-ecru-900 rounded-lg px-4 py-2 shadow-sm"
			{...$$restProps}
		>
			{#each options as option}
				<option selected={value === option.value}>{option.name}</option>
			{/each}
		</select>
	</p>
</div>
