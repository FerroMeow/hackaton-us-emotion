<script lang="ts">
	import { getLoggedUser } from '$lib/firebase/auth';
	import { onMount } from 'svelte';
	import type { LayoutData } from '../$types';
	import { goto } from '$app/navigation';

	export let data: LayoutData;

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
	<slot />
{/if}
