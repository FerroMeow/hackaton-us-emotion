<script lang="ts">
	import { onAuthStateChanged } from 'firebase/auth';
	import type { LayoutData } from './$types';
	import { redirect } from '@sveltejs/kit';
	export let data: LayoutData;
	const { app, auth } = data;
	let user: boolean;

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
