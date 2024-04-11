<script lang="ts">
	import type { LayoutData } from './$types';
	import Navbar from '$lib/Navbar.svelte';
	import { adminLinks } from '$lib/admin/adminLinks';
	import { onMount } from 'svelte';
	import { getLoggedUser } from '$lib/firebase/auth';
	import { goto } from '$app/navigation';

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
	<Navbar navLinks={adminLinks}></Navbar>
	<slot />
{/if}
