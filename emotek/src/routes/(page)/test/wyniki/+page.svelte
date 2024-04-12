<script lang="ts">
	import { getUserResults } from '$lib/firebase/db';
	import type { LayoutData } from '../../$types';
	import { onMount } from 'svelte';
	export let data: LayoutData;
	const { db, emotions } = data;
	let sessions;
	const colors = {
		anger: 'red',
		fear: 'purple',
		happiness: 'orange',
		surprise: 'yellow',
		contempt: 'darkgray',
		disgust: 'darkgreen',
		sadness: 'darkblue'
	};
	onMount(async () => {
		sessions = await getUserResults(
			db,
			1,
			emotions.map((el) => el['eng'])
		);
		sessions.forEach((session) => {
			emotions
				.map((el) => el['eng'])
				.forEach((emotion) => {
					if (session.results[emotion]['total'] == 0) {
						let avg = 0;
					} else {
						let avg = session.results[emotion]['correct'] / session.results[emotion]['total'];
					}
				});
		});
	});
</script>

{#if sessions}
	{#each sessions as session}
		<div>
			<p>sesja id: {session.sessionId}</p>
			{#each emotions as emotion}
				<div
					class="bg-gray flex h-2 w-full overflow-hidden rounded-full"
					style="--var:{(session.results[emotion['eng']]['correct'] /
						session.results[emotion['eng']]['total']) *
						100 +
						'%'}	"
				>
					<div
						class="flex flex-col justify-center overflow-hidden whitespace-nowrap rounded-full"
						style="width: var(--var); background-color:red;"
					></div>
				</div>
				{emotion['pl']}:{session.results[emotion['eng']]['correct'] /
					session.results[emotion['eng']]['total']}<br />
			{/each}
		</div>
	{/each}
{/if}
<p>Wyniki twojego testu:</p>
