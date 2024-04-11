<script lang="ts">
	let carouselContainer: HTMLDivElement;
	let previousButton: HTMLButtonElement;
	let nextButton: HTMLButtonElement;
</script>

<article>
	<slot name="title" />
	<div class="container mx-auto grid grid-cols-[auto_1fr_auto] items-center">
		<div class="col-span-[0_/_1] relative z-10">
			<button>&lt;</button>
		</div>
		<div bind:this={carouselContainer} class="col-span-[0_/_-1]">
			<slot />
		</div>
		<div class="col-span-[1_/_2] relative z-10">
			<button>&gt;</button>
		</div>
	</div>
</article>
