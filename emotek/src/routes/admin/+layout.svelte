<script lang="ts">
	import type { LayoutData } from './$types';
	import Navbar from '$lib/Navbar.svelte';
	import { adminLinks } from '$lib/admin/adminLinks';
	import { onMount } from 'svelte';
	import { getLoggedUser } from '$lib/firebase/auth';
	import { goto } from '$app/navigation';
	import type { NavLink } from '$lib/types/NavLink';

	const sideLinks: NavLink[] = [
		{
			link: 'resource',
			name: 'Zasoby'
		}
	];

	export let data: LayoutData;
	const { auth } = data;

	let authenticated: boolean = false;

	onMount(async () => {
		const user = await getLoggedUser(auth);
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
	<div class="grid min-h-screen grid-rows-[auto_1fr]">
		<Navbar navLinks={adminLinks}></Navbar>

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
			<div class="p-12">
				<slot />
			</div>
		</div>
	</div>
{/if}
