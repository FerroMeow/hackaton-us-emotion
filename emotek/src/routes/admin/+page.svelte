<script lang="ts">
	import { onAuthStateChanged } from 'firebase/auth';
	import type { LayoutData } from './$types';
	import { redirect } from '@sveltejs/kit';
	import { ref, getDownloadURL, uploadBytes, type UploadMetadata } from 'firebase/storage';
	import { v4 as uuidv4 } from 'uuid';
	export let data: LayoutData;

	const storage = data['storage'];

	let files: any;
	let type: string;
	let age: string;
	let category: string;
	let emotions: string[];
	async function upload() {
		console.log(files);
		console.log(files.length);
		for (let i = 0; i < files.length; i++) {
			let file = files[i];
			if (file.type != 'image/jpeg' && file.type != 'image/png') {
				continue;
			}
			const img_ref = ref(storage, Date.now() + file.name);
			uploadBytes(img_ref, file).then((snapshot) => {
				console.log(1);
				getDownloadURL(img_ref).then((url) => {
					console.log(url);
				});
			});
		}
	}

	let selectedEmotions = [];
	let selectedImages = [];

	function isValidImage(file) {
		const acceptedFormats = ['image/jpeg', 'image/png'];
		return acceptedFormats.includes(file.type);
	}

	export let onSubmit = () => {};

	function isFormValid() {
		return selectedEmotions.length > 0 && selectedImages.length > 0;
	}

	function handleSubmit() {
		if (!isFormValid()) {
			alert('Wybierz przynajmniej jedną emocję i jedno zdjęcie.');
			return;
		}

		const formData = {
			emotions: selectedEmotions,
			images: selectedImages
		};
		onSubmit(formData);

		selectedEmotions = [];
		selectedImages = [];
	}
</script>

<form>
	<input type="file" multiple bind:files on:change={upload} />
</form>

<form>
	<input type="file" multiple bind:files on:change={upload} />
</form>

<h2>Dodawanie zdjęć emocji</h2>
<form on:submit | preventDefault={handleSubmit}>
	<label for="emotions">Wybierz emocje: </label>

	<select id="emotions" multiple bind:value={selectedEmotions}>
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
	<input type="file" id="images" multiple bind:value={selectedImages} accept=".jpg, .jpeg, .png" />
	{#if selectedImages.length > 0 && !selectedImages.every(isValidImage)}
		<p style="color: red;">Błędny format plików. Obsługiwane formaty plików JPG lub PNG.</p>
	{/if}
	<br />

	{#if !isFormValid()}
		<p style="color: red;">Wybierz przynajmniej jedną emocję i jedno zdjęcie.</p>
	{/if}

	<button type="submit" disabled={!isFormValid()}>Dodaj zdjęcia</button>
</form>
