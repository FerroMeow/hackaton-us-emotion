<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { getLoggedUser } from '$lib/firebase/auth';
	import { signOut } from 'firebase/auth';
	import { goto } from '$app/navigation';

	export let data: PageData;

	onMount(async () => {
		const loggedInUsed = await getLoggedUser(data.auth);
		if (loggedInUsed) {
			await signOut(data.auth);
			goto('/login', {
				replaceState: true
			});
		}
	});
</script>
