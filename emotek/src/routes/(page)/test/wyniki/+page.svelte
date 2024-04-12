<script lang="ts">
	import { getUserResults, checkAnswer } from '$lib/firebase/db';
	import type { LayoutData } from '../../$types';
	import { onMount } from 'svelte';
	export let data: LayoutData;
	const { db, auth, emotions } = data;
	let sessions;

	onMount(async () => {
		sessions = await getUserResults(
			db,
			1,
			emotions.map((el) => el['eng'])
		);
		console.log(sessions);
	});
</script>

{#if sessions}
	{#each sessions as session}
		<div>
			<p>sesja id: {session.sessionId}</p>
		</div>
	{/each}
{/if}
<p>Wyniki twojego testu:</p>
