<script lang="ts">
	import { getUserInfo, getUserResults } from '$lib/firebase/db';
	import { getLoggedUser } from '$lib/firebase/auth';
	import type { LayoutData } from '../../$types';
	import { onMount } from 'svelte';
	export let data: LayoutData;
	const { db, emotions, auth } = data;
	let sessions;
	const options_time = {
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric'
	};
	const colors = {
		anger: 'redwood-500',
		fear: 'pomp_and_power-500',
		Happiness: 'pink_lavender-400',
		surprise: 'ecru-400',
		contempt: 'gray-500',
		disgust: 'pistachio-500',
		sadness: 'glaucous-600'
	};
	onMount(async () => {
		const userId = await getLoggedUser(auth);
		if (userId) {
			console.log(userId);
			const user = await getUserInfo(db, userId['uid']);
			sessions = await getUserResults(
				db,
				user['userId'],
				emotions.map((el) => el['eng'])
			);
			console.log(sessions);
		}
	});
</script>

<p>Wyniki twoich testów:</p>
{#if sessions}
	<span
		class="text-redwood-500 text-pistachio-500 text-pink_lavender-400 text-ecru-400 bg-redwood-500 bg-pomp_and_power-500 bg-pink_lavender-400 bg-ecru-400 bg-pistachio-500 bg-'glaucous-600 bg-gray-500"
	></span>
	<div class="">
		{#each sessions as session}
			<div
				class={'container mx-auto my-[2%] w-[50%]  border-2 border-solid p-[2%] ' +
					(session.type == 'diagnosis' ? 'border-t-8	 border-t-indigo-600' : '')}
			>
				<p class="text-center">
					{session['type'] == 'diagnosis' ? 'diagnoza' : 'ćwiczenie'}
					{session.sessionId}
				</p>
				<div class=" w-100 flex flex-row justify-around text-center">
					<div class="w-[25%]">
						Czas rozpoczęcia {session['startedAt']
							.toDate()
							.toLocaleString(Date.UTC(), options_time)}
					</div>
					<div class="w-[25%]">
						Czas zakończenia {session['endedAt'].toDate().toLocaleString(Date.UTC(), options_time)}
					</div>
				</div>
				{#each emotions as emotion}
					{#if session.results[emotion['eng']]['total'] > 0}
						{@const aaa =
							session.results[emotion['eng']]['total'] != 0
								? Math.round(
										(session.results[emotion['eng']]['correct'] /
											session.results[emotion['eng']]['total']) *
											100
									)
								: 0}

						<p class={' text-center'} style="color:{emotion.color}">
							{emotion['pl']}:{aaa}%
						</p>
						<div class="mx-auto h-2 w-[100%] bg-gray-300">
							<div
								class={' flex h-full  flex-col justify-center overflow-hidden whitespace-nowrap'}
								style="width:{aaa}%; background-color:{emotion.color}"
							></div>
						</div>
					{/if}
				{/each}
			</div>
		{/each}
	</div>
{/if}
