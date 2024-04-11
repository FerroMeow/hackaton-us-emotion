<script lang="ts">
	import type { LayoutData } from './$types';
	import { ref, getDownloadURL, uploadBytes, type UploadMetadata } from 'firebase/storage';
	import type { Age, ImageCategory, Resource } from '$lib/types/collections/Resource';
	import type { Emotion } from '$lib/types/Emotion';
	import type { Sex } from '$lib/types/collections/subtypes/Sex';
	import { doc } from 'firebase/firestore';
	import { setDocInc } from '$lib/firebase/db';
	export let data: LayoutData;

	const storage = data['storage'];
	const db = data['db'];

	let files: any;
	let age: Age;
	let sex: Sex;
	let category: ImageCategory;
	let selectedEmotions: Emotion[] = [];
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

<h2>Dodawanie zdjęć emocji</h2>
<form>
	<label for="emotions">Wybierz emocje: </label>
	<select id="emotions" multiple on:change={isFormValid} bind:value={selectedEmotions}>
		<option value="anger">Złość</option>
		<option value="contempt">Pogarda</option>
		<option value="fear">Strach</option>
		<option value="disgust">Obrzydzenie</option>
		<option value="happiness">Szczęście</option>
		<option value="sadness">Smutek</option>
		<option value="surprise">Zaskoczenie</option>
	</select>

	<br />
	<label for="images">Wybierz zdjęcia:</label>
	<input
		type="file"
		id="images"
		multiple
		bind:files
		on:change={isFormValid}
		accept=".jpg, .jpeg, .png"
	/>
	<br />
	<label for="age">Wiek osoby na zdjeciu</label>
	<select id="age" bind:value={age}>
		<option value="child">Dziecko/nastolek</option>
		<option value="young adults">Młody dorosły</option>
		<option value="middle-aged adults">Osoba w wieku średnim</option>
		<option value="old-aged adults">Senior</option>
	</select>
	<br />
	<label for="sex">Płeć osoby na zdjeciu</label>
	<select id="sex" bind:value={sex}>
		<option value="male">Mężczyzna</option>
		<option value="female">Kobieta</option>
		<option value="intersex">Osoba interpłciowa</option>
	</select>
	<label for="category">Typ zdjęcia</label>
	<select id="category" bind:value={category}>
		<option value="face">Zdjęcie twarzy</option>
		<option value="fullbody">Zdjęcie ciała</option>
	</select>
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
