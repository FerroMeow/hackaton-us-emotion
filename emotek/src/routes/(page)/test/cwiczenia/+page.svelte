<script lang="ts">
	import type { LayoutData } from '../../$types';
	import type { TrainingSession } from '$lib/types/collections/TrainingSession';
	import type { TrainingSessionResult } from '$lib/types/collections/TrainingSessionResult';
	import { getLoggedUser } from '$lib/firebase/auth';
	import { startTest, nextImage, endTest } from '$lib/testing';
	import { onMount } from 'svelte';
	export let data: LayoutData;
	const { db, auth, emotions } = data;
	emotions.map((el) => el['eng']);
	let selectedEmotion: any;
	let trainingSession: TrainingSession | undefined;
	let images: any[];
	let results: TrainingSessionResult[] = [];
	let image;

	async function next() {
		//TODO test if working

		let { image_res, images_res, results_res } = nextImage(images, results, selectedEmotion);
		image = image_res;
		images = images_res;
		results = results_res;
		if (!image) {
			await endTest(db, trainingSession, results);
		}
	}
	onMount(async () => {
		const user = await getLoggedUser(auth);
		if (user) {
			let { trainingSession_res, images_res } = await startTest(
				'diagnosis',
				emotions.map((el) => el['eng']),
				10,
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
			<select id="emotion" bind:value={selectedEmotion}>
				<option value="">Wybierz emocję: </option>
				<option value="anger">Złość</option>
				<option value="contempt">Pogarda</option>
				<option value="fear">Strach</option>
				<option value="disgust">Obrzydzenie</option>
				<option value="happiness">Szczęście</option>
				<option value="sadness">Smutek</option>
				<option value="surprise">Zaskoczenie</option>
			</select>
			<button on:click={next}>Następne</button>
		</div>
		<div id="result" style="display:none;"></div>
	</div>
</div>
