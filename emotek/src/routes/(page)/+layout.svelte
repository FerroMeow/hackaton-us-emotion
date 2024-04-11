<script lang="ts">
	import Navbar from '$lib/Navbar.svelte';
	import { emotekLinks } from '$lib/emotek/emotekLinks';
	import { onMount } from 'svelte';
	import type { LayoutData } from './$types';
	import { getLoggedUser } from '$lib/firebase/auth';

	export let data: LayoutData;

	let emotekLinksVar = emotekLinks;

	onMount(async () => {
		console.log('on mount');
		const user = await getLoggedUser(data.auth);
		console.log('user data');
		console.log(user ? 'got user' : 'no got user');
		emotekLinksVar.push(
			user
				? {
						link: '/user/',
						name: 'Profil'
					}
				: {
						link: '/login/',
						name: 'Zaloguj się'
					}
		);
		emotekLinksVar = emotekLinksVar;
		console.log(emotekLinksVar);
	});
</script>

<div class="min-h-[100vh]">
	<Navbar navLinks={emotekLinksVar}></Navbar>
	<slot />
</div>
