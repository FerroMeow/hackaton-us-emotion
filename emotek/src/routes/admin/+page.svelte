<script lang="ts">
	import { onAuthStateChanged } from 'firebase/auth';
	import type { LayoutData } from './$types';
	import { redirect } from '@sveltejs/kit';
	import { ref, getDownloadURL, uploadBytesResumable } from 'firebase/storage';
	import { v4 as uuidv4 } from 'uuid';
	export let data: LayoutData;

	const storage = data['storage'];

	let files: any;
	let type: string;
	let age: string;
	let category: string;
	let emotions: string[];

	async function upload() {
		if (files) {
			const img_ref = ref(storage, 'example.jpg');
			let test = undefined;
			let meta = {
				ContentType: 'image.jpeg'
			};
			let task = uploadBytesResumable(img_ref, files);
			task.on(
				'state_changed',
				(snapshot) => {
					console.log(snapshot);
					const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					console.log('progress: ' + progress);
				},
				(error) => {
					console.log('error');
				},
				() => {
					console.log('done');
					//getting the url to saved picture(and setting img src to that url)
					getDownloadURL(task.snapshot.ref).then((URL) => {
						console.log(URL);
						src = URL;
					});
				}
			);
		}
	}
</script>

<form>
	<input type="file" bind:value={files} on:change={upload} />
</form>

panel admina
