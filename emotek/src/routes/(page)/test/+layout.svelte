<script lang="ts">
	import { getLoggedUser } from '$lib/firebase/auth';
	import { onMount } from 'svelte';
	import type { LayoutData } from '../$types';
	import { goto } from '$app/navigation';

	export let data: LayoutData;

	const testLinks = [
		{
			name: 'Diagnozuj',
			link: 'diagnoza'
		},
		{
			name: 'Ćwicz',
			link: 'cwiczenia'
		},
		{
			name: 'Własny test',
			link: 'mojecwiczenia'
		}
	];

	let authenticated = false;

	onMount(async () => {
		const user = await getLoggedUser(data.auth);
		if (user === null) {
			goto('/login/', {
				replaceState: true
			});
		} else {
			authenticated = true;
		}
	});
</script>

{#if authenticated}
	<div class="grid min-h-full grid-cols-[auto_1fr]">
		<nav class="bg-pistachio-700 divide-pomp_and_power-300 divide-y-2 divide-solid px-6 py-4">
			<h3 class="text-lg">Panel Administracyjny</h3>
			<ul class="divide-pomp_and_power-300 divide-y-2 divide-solid">
				{#each testLinks as sideLink}
					<li>
						<a href="/admin/{sideLink.link}" class="text-pomp_and_power-300 text-xl"
							>{sideLink.name}</a
						>
					</li>
				{/each}
			</ul>
		</nav>
		<div class="p-12">
			<slot />
		</div>
	</div>
	<slot />
{/if}
