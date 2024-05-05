<script lang="ts">
	import type { PageData } from './$types';
	import { deleteObject, getDownloadURL, ref } from 'firebase/storage';
	import Button from '$lib/Button.svelte';
	import {
		QueryDocumentSnapshot,
		collection,
		doc,
		getDocs,
		orderBy,
		query,
		runTransaction
	} from 'firebase/firestore';
	import { fade } from 'svelte/transition';
	export let data: PageData;

	let resourceDocsPromise = data.resourceDocs;

	async function deleteDoc(docResource: QueryDocumentSnapshot) {
		await runTransaction(data.db, async (transaction) => {
			transaction.delete(doc(collection(data.db, 'emotions'), docResource.id));
		});
		resourceDocsPromise = getDocs(query(collection(data.db, 'emotions'), orderBy('eng', 'desc')));
	}
</script>

<h1 class="text-2xl">Lista Emocji</h1>

<aside class="my-4">
	<h2 class="text-lg font-bold">Dodaj nową emocję</h2>
	<p><a href="/admin/emotion/new/" class="text-pomp_and_power-300">Nowa emocja</a></p>
</aside>

<div class="flex flex-row flex-wrap divide-y divide-neutral-300">
	{#await resourceDocsPromise}
		<p class="text-4xl" in:fade out:fade>Pobieranie emocji...</p>
	{:then resourceDocs}
		{#each resourceDocs.docs as resourceDoc}
			{@const docData = resourceDoc.data()}

			<div
				class="bg-ecru-700 h-50 mx-auto mt-1 w-64 rounded-3xl p-6"
				style="border-top: 10px solid {docData.color}"
				in:fade
				out:fade
			>
				<h3>{docData.pl}({docData.eng}) {docData.emoji}</h3>
				<div class="mt-4">
					<Button
						class="bg-redwood-400 rounded-lg px-4 py-2 text-white"
						on:click={(event) => deleteDoc(resourceDoc)}>Usuń</Button
					>
				</div>
			</div>
		{/each}
	{:catch}
		<p class="text-4xl" in:fade out:fade>Błąd pobierania zasobów!</p>
	{/await}
</div>
