<script lang="ts">
	import type { layoutData } from './$types';
	import { getLoggedUser } from '$lib/firebase/auth';
	import type { TrainingSession } from '$lib/types/collections/TrainingSession';
	import type { TrainingSessionResult } from '$lib/types/collections/TrainingSessionResult';
	import { startTest, nextImage, endTest } from '$lib/testing';

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

				await next();
			}
		}
	}
	async function next() {
		let { image_res, images_res, results_res } = nextImage(images, results, selectedEmotion);
		image = image_res;
		images = images_res;
		results = results_res;
		if (!image) {
			await endTest(db, trainingSession, results);
		}
	}
</script>

{#if !testStarted}
	<h2>Własny test rozpoznawania emocji</h2>
	<form method="POST" on:submit|preventDefault|stopPropagation={() => {}}>
		<div>
			<label for="emotions">Wybierz emocje:</label>
			<select id="emotions" name="emotions" bind:value={picCategories} multiple>
				{#each emotions as emotion}
					<option value={emotion.eng}>{emotion.pl}</option>
				{/each}
			</select>
		</div>
		<p>
			<label for="picture_count">Wybierz ile zdjęć z każdej kategori chcesz wyświetlic</label><input
				type="number"
				bind:value={picCount}
				min="0"
				max="10"
				id="picture_count"
			/>
		</p>

		<button type="submit" on:click={beginTest}>Rozpocznij swój test</button>
	</form>
{:else}
	<div>
		<h2>Ćwicz rozpoznawanie emocji</h2>
		<div>
			<img id="image" src={image ? image.URL : ''} alt="Zdjęcie do zdiagnozowania emocji" />
			<div id="emotionSelector">
				<label for="emotion">Wybierz emocję: </label>
				<select id="emotion" bind:value={selectedEmotion}>
					{#each emotions as emotion}
						<option value={emotion['eng']}>{emotion['pl']}</option>
					{/each}
				</select>
				<button on:click={next}>Następne</button>
			</div>
			<div id="result" style="display:none;"></div>
		</div>
	</div>
{/if}
