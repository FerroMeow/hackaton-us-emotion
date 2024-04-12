<script lang="ts">
	import EmotionCard from '$lib/emotions/EmotionCard.svelte';
	import { fade } from 'svelte/transition';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div in:fade out:fade>
	<div class="bg-pomp_and_power-400 py-8">
		<div class="container mx-auto">
			<h1 class="pb-12 text-center text-4xl">O emocjach 🤓</h1>
			<div class="flex flex-wrap items-stretch gap-12">
				{#each data.emotionData as emotion}
					<EmotionCard {emotion}></EmotionCard>
				{/each}
			</div>
		</div>
	</div>

	<div class="bg-glaucous-600 py-8">
		<div class="container mx-auto [&>p+p]:mt-4">
			<h1 class="py-8 pb-12 text-center text-4xl">Lorem Ipsum</h1>

			<p>
				Hic ad et voluptate. Maiores nam nihil accusantium qui ab. Rerum quis in et ut saepe totam
				animi placeat. Perferendis molestiae delectus corrupti. Sed nisi totam enim doloremque
				repellendus maiores molestiae.
			</p>
			<p>Aut vero quia eaque. Culpa velit aut quis. Molestiae aut optio reiciendis.</p>
			<p>
				Odio est accusantium cupiditate provident libero maiores. Molestiae fugiat enim voluptatem
				quibusdam expedita. Et recusandae voluptatum dolor consequuntur. Minus unde omnis ut itaque
				eveniet dolore distinctio recusandae. Quia nostrum saepe eos voluptatibus repudiandae.
			</p>
			<p>
				Magni enim voluptatem ipsa. Quidem consectetur voluptatem laborum voluptatibus delectus ut.
				Ad aspernatur quia dicta id voluptas saepe voluptatum. Similique assumenda voluptas porro
				earum ut possimus commodi earum.
			</p>

			<p></p>
		</div>
	</div>
</div>
