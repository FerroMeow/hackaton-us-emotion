<script lang="ts">
	import type { NavLink } from '$lib/types/NavLink';

	const sideLinks: NavLink[] = [
		{
			link: 'resources',
			name: 'Zasoby'
		}
	];
</script>

<div class="grid grid-cols-[auto_1fr]">
	<nav class="bg-pistachio-700 divide-pomp_and_power-300 divide-y-2 divide-solid px-6 py-4">
		<h3 class="text-lg">Panel Administracyjny</h3>
		<ul class="divide-pomp_and_power-300 divide-y-2 divide-solid">
			{#each sideLinks as sideLink}
				<li>
					<a href="/admin/{sideLink.link}" class="text-pomp_and_power-300 text-xl"
						>{sideLink.name}</a
					>
				</li>
			{/each}
		</ul>
	</nav>
</div>
