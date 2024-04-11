<script lang="ts">
	import type { PageData } from './$types';
	import { ref, getDownloadURL, uploadBytes, type UploadMetadata } from 'firebase/storage';
	import type { Age, ImageCategory, Resource } from '$lib/types/collections/Resource';
	import type { Emotion } from '$lib/types/Emotion';
	import type { Sex } from '$lib/types/collections/subtypes/Sex';
	import { doc } from 'firebase/firestore';
	import { setDocInc } from '$lib/firebase/db';
	import Input from '$lib/Input.svelte';
	export let data: PageData;

	const emotionOptions = [
		{ name: 'Złość', value: 'anger' },
		{ name: 'Pogarda', value: 'contempt' },
		{ name: 'Strach', value: 'fear' },
		{ name: 'Obrzydzenie', value: 'disgust' },
		{ name: 'Szczęście', value: 'happiness' },
		{ name: 'Smutek', value: 'sadness' },
		{ name: 'Zaskoczenie', value: 'surprise' }
	];

	const storage = data['storage'];
	const db = data['db'];

	let files: any;
	let age: Age;
	let sex: Sex;
	let category: ImageCategory;
	let selectedEmotions: Emotion[] = [];
	$: console.log(selectedEmotions);
	let isValid = false;
	async function upload() {
		for (let i = 0; i < files.length; i++) {
			let file = files[i];
			let resource: Resource;
			if (file.type != 'image/jpeg' && file.type != 'image/png') {
				continue;
			}
			const name = Date.now() + file.name;
			const img_ref = ref(storage, name);
			uploadBytes(img_ref, file).then((snapshot) => {
				getDownloadURL(img_ref).then(async (url) => {
					console.log(url);
					resource = {
						resourceId: 1,
						type: 'image',
						sex: sex,
						age: age,
						imageCategory: category,
						emotions: selectedEmotions,
						URL: url
					} satisfies Resource;
					await setDocInc(doc(db, 'resource', name), resource, 'resourceId');
				});
			});
		}
	}

	function isValidImage() {
		if (files) {
			const acceptedFormats = ['image/jpeg', 'image/png'];
			for (let i = 0; i < files.length; i++) {
				if (!acceptedFormats.includes(files[i].type)) {
					return false;
				}
			}
		}
		return true;
	}

	async function isFormValid() {
		console.log(files);
		isValid = files && selectedEmotions.length > 0 && files.length > 0;
	}
</script>

<h1 class="text-4xl">Dodawanie zdjęć emocji</h1>
<form class="container mx-auto grid grid-cols-2">
	<div class="col-span-2 flex flex-wrap gap-4">
		<p>Wybierz emocje:</p>
		{#each emotionOptions as emotion}
			<input
				id="emotions-{emotion.value}"
				value={emotion.value}
				type="checkbox"
				name="checkbox"
				bind:group={selectedEmotions}
				class="[&:checked+label]:bg-pistachio-500 accent-pistachio-500"
			/>
			<label
				for="emotions-{emotion.value}"
				class="bg-pistachio-900 cursor-pointer rounded-xl px-6 py-2 shadow-md"
			>
				{emotion.name}
			</label>
		{/each}
	</div>
	<div class="grid grid-cols-1 grid-rows-1 self-stretch justify-self-stretch shadow-sm">
		<p class="col-[1_/_2] row-[1_/_2]">
			<input
				type="file"
				id="images"
				multiple
				bind:files
				on:change={isFormValid}
				accept=".jpg, .jpeg, .png"
				class="invisible"
			/>
		</p>
		<p class="col-[1_/_2] row-[1_/_2]">
			<label
				for="images"
				class="text-pomp_and_power-300 block flex h-full cursor-pointer items-center justify-center text-xl"
			>
				<span> Wybierz zdjęcia </span>
			</label>
		</p>
	</div>
	<div class="h-80 self-center justify-self-center"></div>
	<div>
		<p>
			<label for="age">Wiek osoby na zdjeciu</label>
		</p>
		<p>
			<select
				id="age"
				bind:value={age}
				class="bg-ecru-900 accent-ecru-900 rounded-lg px-4 py-2 shadow-sm"
			>
				<option value="child">Dziecko/nastolek</option>
				<option value="young adults">Młody dorosły</option>
				<option value="middle-aged adults">Osoba w wieku średnim</option>
				<option value="old-aged adults">Senior</option>
			</select>
		</p>
	</div>
	<div>
		<p>
			<label for="sex">Płeć osoby na zdjeciu</label>
		</p>
		<p>
			<select
				id="sex"
				bind:value={sex}
				class="bg-ecru-900 accent-ecru-900 rounded-lg px-4 py-2 shadow-sm"
			>
				<option value="male">Mężczyzna</option>
				<option value="female">Kobieta</option>
				<option value="intersex">Osoba interpłciowa</option>
			</select>
		</p>
	</div>
	<div>
		<p>
			<label for="category">Typ zdjęcia</label>
		</p>
		<p>
			<select
				id="category"
				bind:value={category}
				class="bg-ecru-900 accent-ecru-900 rounded-lg px-4 py-2 shadow-sm"
			>
				<option value="face">Zdjęcie twarzy</option>
				<option value="fullbody">Zdjęcie ciała</option>
			</select>
		</p>
	</div>
	{#if files && files.length > 0 && !isValidImage()}
		<p style="color: red;">Błędny format plików. Obsługiwane formaty plików JPG lub PNG.</p>
	{/if}
	<br />

	{#if !isValid}
		<p style="color: red;">Wybierz przynajmniej jedną emocję i jedno zdjęcie.</p>
		<button type="submit" disabled>Dodaj zdjęcia</button>
	{:else}
		<button type="submit" on:click={upload}>Dodaj zdjęcia</button>
	{/if}
</form>
