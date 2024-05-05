<script lang="ts">
	import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
	import type { LayoutData } from '../../$types';
	import { httpsCallable } from 'firebase/functions';
	export let data: LayoutData;
	const { emotions, storage, functions } = data;
	let files: FileList = [];
	let src = '';
	let state = 'not_started';
	let predictions = [];
	const colors = {
		anger: 'redwood-500',
		fear: 'pomp_and_power-500',
		Happiness: 'pink_lavender-400',
		surprise: 'ecru-400',
		contempt: 'gray-500',
		disgust: 'pistachio-500',
		sadness: 'glaucous-600'
	};

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

<span
	class="text-redwood-500 text-pistachio-500 text-pink_lavender-400 text-ecru-400 bg-redwood-500 bg-pomp_and_power-500 bg-pink_lavender-400 bg-ecru-400 bg-pistachio-500 bg-'glaucous-600 bg-gray-500"
></span>
<div>
	<div style="min-height:80vh; width:80%; margin:auto; margin-top:2%" class="bg-pink_lavender-800">
		<div style="border:1px solid red; width:100%; height:25%; padding:1%">
			<h1 class="text-2xl font-bold">Narzędzie wspomagające wykrywanie emocji</h1>
			<p>
				Aby skorzystać z naszego narzędzia, wcisnij przycisk poniżej i wybierz zdjęcie na którym
				nasz system ma wykryć emocje. Po wybraniu zdjęcia proces może chwilę potrwać.
			</p>
			<input type="file" id="image" bind:files accept=".jpg, .jpeg, .png" on:change={upload} />
		</div>
		{#if state == 'finished'}
			<div style="border:1px solid blue; width:100%; height:75%; display:flex; flex-direction:row">
				<div
					style="border:1px solid green; width:70%; height:100%; display:flex; align-items:center;"
				>
					<img {src} style="max-width:80%;max-height:80%; margin:auto;" alt="" />
				</div>
				<div style="width: 30%;height:100%; padding:1%  ">
					<h1>Wyniki:</h1>
					{#each Object.entries(predictions) as [index, prediction]}
						<div
							style="border-top:5px solid black; margin-top:1%"
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
								<p class={'text-' + colors[emotion['eng']]}>
									{emotion['pl']}:{aaa}%
								</p>
								<div class="mx-auto h-2 w-[100%] bg-gray-300">
									<div
										class={'bg-' +
											colors[emotion['eng']] +
											' flex h-full  flex-col justify-center overflow-hidden whitespace-nowrap'}
										style:width={`${aaa}%`}
									></div>
								</div>
							{/each}
						</div>
					{/each}
				</div>
			</div>
		{:else if state == 'started'}
			<h1>Proszę czekać...</h1>
		{/if}
	</div>
</div>
