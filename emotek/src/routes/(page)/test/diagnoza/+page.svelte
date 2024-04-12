<script lang="ts">
	import type { LayoutData } from '../../$types';
	import type { TrainingSession } from '$lib/types/collections/TrainingSession';
	import type { TrainingSessionResult } from '$lib/types/collections/TrainingSessionResult';
	import { getLoggedUser } from '$lib/firebase/auth';
	import { startTest, nextImage, endTest } from '$lib/testing';
	import { onMount } from 'svelte';
	import Button from '$lib/Button.svelte';
	export let data: LayoutData;
	const { db, auth, emotions } = data;
	let selectedEmotion: any[] = [];
	let trainingSession: TrainingSession | undefined;
	let images: any[];
	let results: TrainingSessionResult[] = [];
	let image: any;
	const image_per_emotion = 10;
	let last_emotion: string[] = [];

	async function next() {
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
	<div class="container mx-auto">
		<h2 class="pt-16 text-4xl">Ćwicz rozpoznawanie emocji</h2>
		<p class="mt-4 text-xl">
			To ćwiczenie ma na celu diagnozowanie potencjalnych problemów w rozróżnianiu emocji
		</p>
		<p class="mt-4 text-xl">Zaznacz poprawną emocję, i gdy jesteś pewien kliknij "Następny"</p>
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
					<select id="emotion" multiple bind:value={selectedEmotion}> </select>
				</p>
				<p>
					<Button on:click={next}>Następne</Button>
				</p>
			</div>
			<div>
				<img id="image" src={image ? image.URL : ''} alt="Zdjęcie do zdiagnozowania emocji" />
				<div id="result" style="display:none;"></div>
			</div>
		</div>
	</div>
</div>
