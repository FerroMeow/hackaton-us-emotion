<script lang="ts">
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
	import type { LayoutData } from '../../$types';
	import { httpsCallable } from 'firebase/functions';
	import Button from '$lib/Button.svelte';
	export let data: LayoutData;
	const { emotions, storage, functions } = data;
	let files: FileList = [];
	let src = '';
	let state = 'not_started';
	let predictions = [];
	let consent = false;
	async function upload() {
		if (files.length > 0) {
			state = 'started';
			const name = 'tmp/' + Date.now() + files[0].name;
			const img_ref = ref(storage, name);
			let imageUrl = '';
			await uploadBytes(img_ref, files[0]).then(async (res) => {
				console.log('done');
			});
			const on_request_example = httpsCallable(functions, 'on_request_example');
			await on_request_example({ image: img_ref.fullPath }).then(async (res) => {
				console.log(res);
				const new_ref = ref(storage, res['data']['img_name']);
				await getDownloadURL(new_ref).then((url) => {
					src = url;
				});

				predictions = res['data']['predictions'];
				state = 'finished';
			});
		}
	}
</script>

<div>
	<div class="bg-pink_lavender-800 m-auto mt-[2%] h-[80vh] w-[80%]">
		<div class="w-100 h-20 p-1">
			<h1 class="text-2xl font-bold">Narzędzie wspomagające wykrywanie emocji</h1>
			<p>
				Aby skorzystać z naszego narzędzia, wcisnij przycisk poniżej i wybierz zdjęcie na którym
				nasz system ma wykryć emocje. Po wybraniu zdjęcia proces może chwilę potrwać.
			</p>
		</div>
		{#if state != 'finished'}
			<div>
				<form on:submit|preventDefault|stopPropagation={() => {}} class="z-0 m-5">
					<p>
						<label
							for="image"
							class="text-pomp_and_power-300 flex h-full w-full cursor-pointer text-xl"
						>
							{#if !files.length}
								<p class="text-pistachio-300 w-full">
									<span> Wybierz zdjęcia </span>
								</p>
							{:else}
								{#each files as file}
									{@const imageUrl = URL.createObjectURL(file)}
									<div>
										<img
											src={imageUrl}
											on:load|once={() => URL.revokeObjectURL(imageUrl)}
											alt={file.name}
											class="h-32 w-32 bg-white object-contain"
										/>
									</div>
								{/each}
							{/if}
						</label>
						<input type="file" id="image" bind:files accept=".jpg, .jpeg, .png" class="hidden" />
					</p>
					<p class="my-2">
						<input required type="checkbox" bind:checked={consent} id="consent" />
						<label for="consent"
							>Zgadzam się na tymczasowe przechowywanie przesłanych zdjęć na serwerach "Emotek.pl"</label
						>
					</p>
					<p>
						{#if consent}
							<Button type="submit" on:click={upload}>Wyślij zdjęcie</Button>
						{:else if !consent}
							<p style="color: red;">
								Skorzystanie z usługie wymaga zgody na przechowywanie zdjęcia.
							</p>
							<Button type="submit" disabled>Wyślij zdjęcie</Button>
						{:else if state == 'started'}
							<Button type="submit" disabled>Wyślij zdjęcie</Button>
						{/if}
					</p>
				</form>
			</div>
		{/if}

		{#if state == 'finished'}
			<div class="w-100 m-2 flex h-[65vh] flex-row">
				<div class="h-100 m-2 w-[70%] justify-center border-r align-middle">
					<img {src} class="m-auto h-[80%] w-[80%] bg-white object-contain" alt="" />
				</div>
				<div class="h-100 w-[29%] overflow-y-scroll p-1">
					<h1>Wyniki:</h1>
					{#each Object.entries(predictions) as [index, prediction]}
						<div
							class="mt-1 border-t-4"
							style:border-top-color={'rgb(' +
								prediction['color'][2] +
								',' +
								prediction['color'][1] +
								',' +
								prediction['color'][0] +
								')'}
						>
							<p
								style:color={'rgb(' +
									prediction['color'][2] +
									',' +
									prediction['color'][1] +
									',' +
									prediction['color'][0] +
									')'}
							>
								Osoba numer {index}
							</p>
							{#each emotions as emotion}
								{@const aaa = Math.round(parseFloat(prediction['result'][emotion['eng']]) * 100)}
								<p style="color:{emotion.color}">
									{emotion['pl']}:{aaa}%
								</p>
								<div class="mx-auto h-2 w-[100%] bg-gray-300">
									<div
										class={' flex h-full  flex-col justify-center overflow-hidden whitespace-nowrap'}
										style="background-color:{emotion.color}"
										style:width={`${aaa}%`}
									></div>
								</div>
							{/each}
						</div>
					{/each}
				</div>
			</div>
		{:else if state == 'started'}<p class="text-center text-xl">Proszę czekać...</p>{/if}
	</div>
</div>
