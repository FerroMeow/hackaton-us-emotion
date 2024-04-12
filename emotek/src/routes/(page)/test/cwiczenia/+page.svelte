<script lang="ts">
	import type { LayoutData } from '../../$types';
	import type { TrainingSession } from '$lib/types/collections/TrainingSession';
	import type { TrainingSessionResult } from '$lib/types/collections/TrainingSessionResult';
	import { getLoggedUser } from '$lib/firebase/auth';
	import { startTest, nextImage, endTest } from '$lib/testing';
	import { onMount } from 'svelte';
	export let data: LayoutData;
	const { db, auth, emotions } = data;
	let selectedEmotion: string[] = [];
	let trainingSession: TrainingSession | undefined;
	let images: any[];
	let results: TrainingSessionResult[] = [];
	let image;
	let image_per_emotion = 3;
	let last_emotion: string[] = [];

	async function next() {
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
		if (!image) {
			await endTest(db, trainingSession, results);
		}
	}
	onMount(async () => {
		const user = await getLoggedUser(auth);
		if (user) {
			let { trainingSession_res, images_res } = await startTest(
				'exercise',
				emotions.map((el) => el['eng']),
				image_per_emotion,
				user.uid,
				db
			);
			trainingSession = trainingSession_res;
			images = images_res;

			await next();
		}
	});
</script>

<div>
	<h2>Ćwicz rozpoznawanie emocji</h2>
	<div>
		<img id="image" src={image ? image.URL : ''} alt="Zdjęcie do zdiagnozowania emocji" />
		<div id="emotionSelector">
			<label for="emotion">Wybierz emocję: </label>
			<select id="emotion" multiple bind:value={selectedEmotion}>
				{#each emotions as emotion}
					<option value={emotion['eng']}>{emotion['pl']}</option>
				{/each}
			</select>
			<button on:click={next}>Następne</button>
		</div>
		<div id="result" style="display:none;"></div>
	</div>
</div>
