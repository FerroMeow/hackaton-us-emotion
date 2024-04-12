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
			transaction.delete(doc(collection(data.db, 'resource'), docResource.id));
			await deleteObject(ref(data.storage, docResource.id));
		});
		resourceDocsPromise = getDocs(
			query(collection(data.db, 'resource'), orderBy('resourceId', 'desc'))
		);
	}
</script>

<h1 class="text-2xl">Lista zasobów</h1>

<aside class="my-4">
	<h2 class="text-lg font-bold">Dodaj nowy zasób</h2>
	<p><a href="/admin/resource/new/" class="text-pomp_and_power-300">Nowy zasób</a></p>
</aside>

<div class="divide-y divide-neutral-300">
	{#await resourceDocsPromise}
		<p class="text-4xl" in:fade out:fade>Pobieranie zasobów...</p>
	{:then resourceDocs}
		{#each resourceDocs.docs as resourceDoc}
			{@const docData = resourceDoc.data()}
			<div class="bg-ecru-700 mx-auto w-min min-w-64 rounded-3xl p-6" in:fade out:fade>
				<figure>
					<img src={docData.URL} alt="" />
					<!-- {#await getDownloadURL(docData.URL) then fullUrl}
            {/await} -->
				</figure>
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
