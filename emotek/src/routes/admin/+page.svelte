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
			const img_ref = ref(storage, Date.now() + file.name);
			uploadBytes(img_ref, file).then((snapshot) => {
				console.log(1);
				getDownloadURL(img_ref).then((url) => {
					console.log(url);
				});
			});
		}
	}
</script>

<form>
	<input type="file" multiple bind:files on:change={upload} />
</form>

panel admina
