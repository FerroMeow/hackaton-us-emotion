<script lang="ts">
	import type { PageData } from '../$types';
	import { ref, getDownloadURL, uploadBytes, type UploadMetadata } from 'firebase/storage';
	import type { Age, ImageCategory, Resource } from '$lib/types/collections/Resource';
	import type { Emotion } from '$lib/types/Emotion';
	import type { Sex } from '$lib/types/collections/subtypes/Sex';
	import { doc } from 'firebase/firestore';
	import { setDocInc } from '$lib/firebase/db';
	import Input from '$lib/Input.svelte';
	import Button from '$lib/Button.svelte';
	import { goto } from '$app/navigation';
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

	let files: FileList = [];
	let age: Age;
	let sex: Sex;
	let category: ImageCategory;
	let selectedEmotions: Emotion[] = [];
	$: isValid = files && selectedEmotions.length > 0 && files.length > 0;
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
					goto('/admin/resource', {
						replaceState: true
					});
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
</script>

<h1 class="text-4xl">Dodawanie zdjęć emocji</h1>
<form class="container mx-auto grid grid-cols-2">
	<p class="m-4 text-xl">Wybierz emocje</p>
	<div class="col-span-2 flex flex-wrap gap-4">
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
	<div class="col-span-2 grid h-96 grid-cols-2 justify-self-stretch shadow-sm">
		<p class="col-[1_/_3] row-[1_/_2]">
			<input
				type="file"
				id="images"
				multiple
				bind:files
				accept=".jpg, .jpeg, .png"
				class="invisible"
			/>
		</p>
		<p class="relative col-[1_/_3] row-[1_/_2]">
			<label
				for="images"
				class="text-pomp_and_power-300 flex h-full w-full cursor-pointer items-center justify-center text-xl"
			>
				{#if !files.length}
					<p class="text-pistachio-300 -tranlate-y-1/2 absolute top-1/2 w-full text-center">
						<span> Wybierz zdjęcia </span>
					</p>
				{:else}
					{#each files as file}
						{@const imageUrl = URL.createObjectURL(file)}
						<div>
							<img
								src={imageUrl}
								on:load|once={() => URL.revokeObjectURL(imageUrl)}
								alt={file.name}
								class="max-h-96"
							/>
						</div>
					{/each}
				{/if}
			</label>
		</p>
	</div>
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

	<div class="my-4">
		{#if !isValid}
			<p style="color: red;">Wybierz przynajmniej jedną emocję i jedno zdjęcie.</p>
			<Button type="submit" disabled>Dodaj zdjęcia</Button>
		{:else}
			<Button type="submit" on:click={upload}>Dodaj zdjęcia</Button>
		{/if}
	</div>
</form>
