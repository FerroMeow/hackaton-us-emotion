<script lang="ts">
	import { getLoggedUser } from '$lib/firebase/auth';
	import { onMount } from 'svelte';
	import type { LayoutData } from '../$types';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';

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
	<div class="grid min-h-full grid-rows-[auto_1fr]">
		<nav class="bg-glaucous-700 divide-pomp_and_power-300 px-6 py-4">
			<ul class="divide-pink_lavender-300 container mx-auto flex gap-4">
				{#each testLinks as sideLink}
					<li>
						<a href="/test/{sideLink.link}" class="text-pomp_and_power-300 text-2xl"
							>{sideLink.name}</a
						>
					</li>
				{/each}
			</ul>
		</nav>
		<div class="bg-pink_lavender-800">
			<slot />
		</div>
	</div>
{/if}
