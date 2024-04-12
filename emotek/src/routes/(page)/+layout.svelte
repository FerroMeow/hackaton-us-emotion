<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import { emotekLinks } from '$lib/emotek/emotekLinks';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { getLoggedUser } from '$lib/firebase/auth';
	import { fade } from 'svelte/transition';

	export let data: LayoutData;

	let emotekLinksVar = emotekLinks;

	onMount(async () => {
		const user = await getLoggedUser(data.auth);
		emotekLinksVar = emotekLinks.concat(
			user
				? [
						{
							link: '/logout/',
							name: 'Wyloguj się 🥶'
						}
					]
				: [
						{
							link: '/login/',
							name: 'Zaloguj się 😍'
						}
					]
		);
		emotekLinksVar = emotekLinksVar;
	});
</script>

<div in:fade out:fade>
	<div class="grid min-h-[100vh] grid-rows-[auto_1fr]">
		<Navbar navLinks={emotekLinksVar}></Navbar>
		<div class="bg-ecru-500">
			<slot />
		</div>
	</div>

	<footer class="bg-black py-2 text-right text-white">
		<p>&copy; Piotr Sołtysik, Oliwia Gonta, Konrad Balcerzak {new Date().getFullYear()}</p>
	</footer>
</div>
