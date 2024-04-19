<script lang="ts">
	import type { layoutData } from './$types';
	import { getLoggedUser } from '$lib/firebase/auth';
	import type { TrainingSession } from '$lib/types/collections/TrainingSession';
	import type { TrainingSessionResult } from '$lib/types/collections/TrainingSessionResult';
	import { startTest, nextImage, endTest } from '$lib/testing';
	import Button from '$lib/Button.svelte';
	import { fade } from 'svelte/transition';

	export let data: layoutData;
	const { emotions, db, auth } = data;
	let picCategories: string[] = [];
	let picCount: number = 1;
	let testStarted: Boolean = false;
	let selectedEmotion: any[] = [];
	let trainingSession: TrainingSession | undefined;
	let images: any[];
	let results: TrainingSessionResult[] = [];
	let image;
	let last_emotion: string[] = [];
	let ended = false;
	async function beginTest() {
		if (picCategories.length > 0) {
			testStarted = true;
			const user = await getLoggedUser(auth);
			if (user) {
				let { trainingSession_res, images_res } = await startTest(
					'exercise',
					picCategories,
					picCount,
					user.uid,
					db
				);
				trainingSession = trainingSession_res;
				images = images_res;

				await next(true);
			}
		}
	}
	async function next(first = false) {
		if (selectedEmotion.length == 0 && !first) {
			return;
		}
		if (ended) {
			return;
		}
		//TODO test if working
		let { image_res, images_res, results_res, last_emotion_res } = nextImage(
			images,
			results,
			selectedEmotion,
			last_emotion
		);
		image = image_res;
		images = images_res;
		results = results_res;
		last_emotion = last_emotion_res;
		selectedEmotion = [];
		if (!image) {
			ended = true;
			await endTest(db, trainingSession, results);
		}
	}
</script>

<div>
	<div class="container mx-auto">
		<h2 class="pt-16 text-4xl">Ćwicz rozpoznawanie emocji</h2>
		<p class="mt-4 text-xl">
			To ćwiczenie pozwala Ci wybrać emocje które według ciebie sprawiają ci problem, i ćwiczenie
			ich.
		</p>
		{#if !testStarted}
			<form method="POST" on:submit|preventDefault|stopPropagation={() => {}}>
				<div>
					<p>
						<label for="emotions">Wybierz emocje:</label>
					</p>
					<p>
						<select id="emotions" name="emotions" bind:value={picCategories} multiple>
							{#each emotions as emotion}
								<option value={emotion.eng}>{emotion.pl}</option>
							{/each}
						</select>
					</p>
				</div>
				<div class="mt-4">
					<p>
						<label for="picture_count">Wybierz ile zdjęć z każdej kategori chcesz wyświetlic</label>
					</p>
					<p>
						<input type="number" bind:value={picCount} min="0" max="10" id="picture_count" />
					</p>
				</div>
				<p>
					<Button type="submit" class="mt-4" on:click={beginTest}>Rozpocznij swój test</Button>
				</p>
			</form>
		{:else}
			<p class="mt-4 text-xl">Zaznacz poprawną emocję, i gdy jesteś pewien kliknij "Następny"</p>
			{#if !ended}
				<div class="mt-16 grid grid-cols-2">
					<div class="self-center justify-self-center">
						<p class="text-2xl">Wybierz emocję:</p>
						<p id="emotionSelector" class="mx-auto p-8">
							{#each emotions as emotion}
								<span class="mx-4 inline-block">
									<label for="emotion-{emotion.eng}" class="text-xl">{emotion.pl}</label>
									<input
										id="emotion-{emotion.eng}"
										type="checkbox"
										value={emotion.eng}
										bind:group={selectedEmotion}
									/>
								</span>
							{/each}
						</p>
						<p>
							{#if !ended}
								<Button
									on:click={() => {
										next(false);
									}}>Następne</Button
								>
							{/if}
						</p>
					</div>
					<div class="h-[50%] w-[50%]">
						<img
							id="image"
							src={image ? image.URL : ''}
							alt="Zdjęcie do zdiagnozowania emocji"
							class="h-96 object-cover"
							style="object-fit: cover;"
						/>
						<div id="result" style="display:none;"></div>
					</div>
				</div>
			{:else}
				<p>Zapisywanie wyniku...</p>
			{/if}
		{/if}
	</div>
</div>
