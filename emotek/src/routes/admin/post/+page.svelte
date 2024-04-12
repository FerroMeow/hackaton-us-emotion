<script lang="ts">
	import Button from '$lib/Button.svelte';
	import { type QueryDocumentSnapshot } from 'firebase/firestore';
	import type { PageData } from './$types';
	import { deletePost, getPosts } from '$lib/firebase/blog';

	export let data: PageData;

	let postPromise = data.posts;
	$: console.log(postPromise);

	async function deleteCurrentPost(document: QueryDocumentSnapshot) {
		await deletePost(data.db, document);
		postPromise = getPosts(data.db);
	}
</script>

<aside class="my-4">
	<h2 class="text-lg font-bold">Dodaj nowy post</h2>
	<p><a href="/admin/post/new/" class="text-pomp_and_power-300">Nowy post</a></p>
</aside>

{#await postPromise then posts}
	{#each posts.docs as post}
		{@const postData = post.data()}
		{@const jsonVal = console.log(JSON.stringify(postData))}

		<article>
			<h3 class="text-xl">
				<a href="/blog/{post.id}">
					{postData.title}
				</a>
			</h3>
			<p class="text-pomp_and_power-500 text-sm">{postData.date.toDate()?.toLocaleString()}</p>
		</article>
		<div class="mt-4">
			<Button
				class="bg-redwood-400 rounded-lg px-4 py-2 text-white"
				on:click={(event) => deleteCurrentPost(post)}>Usuń</Button
			>
		</div>
	{/each}
{/await}
