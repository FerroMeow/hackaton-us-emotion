<script lang="ts">
	import Button from '$lib/Button.svelte';
	import Input from '$lib/Input.svelte';
	import { QueryDocumentSnapshot, addDoc, collection, doc, setDoc } from 'firebase/firestore';
	import type { PageData } from './$types';
	import { setDocInc } from '$lib/firebase/db';
	import { goto } from '$app/navigation';
	import { fade } from 'svelte/transition';

	export let data: PageData;

	const postModel = {
		postId: 0,
		title: '',
		date: null as Date | null,
		content: ''
	};

	async function addNewPost() {
		postModel.date = new Date();
		setDocInc(doc(data.db, 'post', String(Date.now())), postModel, 'postId');
		goto('/admin/post', {
			replaceState: true
		});
	}
</script>

<h1 class="text-4xl">Dodaj posta na blog</h1>

<form on:submit|preventDefault|stopPropagation={() => {}} in:fade out:fade>
	<Input id="title" bind:value={postModel.title}>Tytuł</Input>
	<div>
		<p><label for="content">Treść posta</label></p>
		<p>
			<textarea
				class="bg-ecru-900 my-4 block min-h-24 w-full rounded-lg px-6 pb-2"
				id="content"
				name="content"
				bind:value={postModel.content}
			></textarea>
		</p>
	</div>
	<p>
		<Button on:click={addNewPost}>Zapisz</Button>
	</p>
</form>
