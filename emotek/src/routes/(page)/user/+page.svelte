<script lang="ts">
	import { getUser, getLoggedUser } from '$lib/firebase/auth';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	onMount(async () => {
		const user = await getLoggedUser(data.auth);
		if (user) {
			const a = await getUser(user, data.auth, data.db);
		}
	});
</script>
