<script lang="ts">
	import type { PageData } from '../$types';
	import { ref, getDownloadURL, uploadBytes, type UploadMetadata } from 'firebase/storage';
	import type { Age, ImageCategory, Resource } from '$lib/types/collections/Resource';
	import type { Sex } from '$lib/types/collections/subtypes/Sex';
	import { doc } from 'firebase/firestore';
	import { setDocInc } from '$lib/firebase/db';
	import Button from '$lib/Button.svelte';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';
	import type { Emotion } from '$lib/types/collections/Emotion';
	export let data: PageData;

	data.emotions;

	const db = data['db'];
	let eng: string = '';
	let pl: string = '';
	let color: string = '';
	let emoji: string = '';
	$: isValid = eng.length > 0 && pl.length > 0 && emoji.length > 0;

	async function upload() {
		console.log(pl);
		console.log(eng);
		console.log(color);
		console.log(emoji);

		let emotion: Emotion;
		emotion = {
			eng: eng,
			pl: pl,
			color: color,
			emoji: emoji
		};
		await setDocInc(doc(db, 'emotions', eng), emotion, 'emotionId');
		goto('/admin/emotion', {
			replaceState: true
		});
	}
</script>

<h1 class="text-4xl">Dodawanie nowej emocji</h1>
<form class="container mx-auto grid grid-cols-2">
	<label for="eng">Angielska nazwa:</label>
	<input type="text" id="eng" bind:value={eng} required />
	<label for="eng">Polska nazwa:</label>
	<input type="text" id="pl" bind:value={pl} required />
	<label for="color">Kolor:</label>
	<input type="color" id="color" bind:value={color} required />
	<label for="emoticon">Emotka:</label>
	<input type="text" id="emoticon" bind:value={emoji} required maxlength="2" />

	<div class="my-4">
		{#if !isValid}
			<p style="color: red;">Wszystkie pola muszą być wypełnione.</p>
			<Button type="submit" disabled>Dodaj emocję</Button>
		{:else}
			<Button type="submit" on:click={upload}>Dodaj emocję</Button>
		{/if}
	</div>
</form>
