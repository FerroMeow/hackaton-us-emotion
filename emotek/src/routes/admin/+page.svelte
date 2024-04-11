<script lang="ts">
	import { onAuthStateChanged } from 'firebase/auth';
	import type { LayoutData } from './$types';
	import { redirect } from '@sveltejs/kit';
	import { ref, getDownloadURL, uploadBytes, type UploadMetadata } from 'firebase/storage';
	import { v4 as uuidv4 } from 'uuid';
	import type { Resource } from '$lib/types/collections/Resource';
	export let data: LayoutData;

	const storage = data['storage'];

	let files: any;
	let type: string;
	let age: string;
	let category: string;
	let emotions: string[];
	let selectedEmotions = [];
	let isValid = false;
	async function upload() {
		for (let i = 0; i < files.length; i++) {
			let file = files[i];

			if (file.type != 'image/jpeg' && file.type != 'image/png') {
				continue;
			}
			const img_ref = ref(storage, Date.now() + file.name);
			uploadBytes(img_ref, file).then((snapshot) => {
				getDownloadURL(img_ref).then((url) => {
					console.log(url);
					let resource: Resource = {
						resourceId: 1,
						type: 'image'
					};
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

	function handleSubmit() {
		if (!isValid) {
			alert('Wybierz przynajmniej jedną emocję i jedno zdjęcie.');
			return;
		}
		const formData = {
			emotions: selectedEmotions,
			images: files
		};
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
	{#if files && files.length > 0 && !isValidImage()}
		<p style="color: red;">Błędny format plików. Obsługiwane formaty plików JPG lub PNG.</p>
	{/if}
	<br />

	{#if !isValid}
		<p style="color: red;">Wybierz przynajmniej jedną emocję i jedno zdjęcie.</p>
		<button type="submit" disabled>Dodaj zdjęcia</button>
	{:else}
		<button type="submit" on:click={handleSubmit}>Dodaj zdjęcia</button>
	{/if}
</form>
