<script lang="ts">
	import { page } from '$app/stores';
	import { fade } from 'svelte/transition';
</script>

<div class="grid min-h-full grid-rows-[auto_1fr]" in:fade out:fade>
	<div class="py-24 {$page.data.topBg} {$page.data.topText}">
		<div class="container mx-auto">
			<h1 class="text-4xl">{$page.data.emotionPageTitle}</h1>
		</div>
	</div>
	<div class="py-8 {$page.data.botBg} {$page.data.botText}">
		<div class="container mx-auto text-xl [&>p+p]:mt-4">
			<slot />
		</div>
	</div>
</div>
