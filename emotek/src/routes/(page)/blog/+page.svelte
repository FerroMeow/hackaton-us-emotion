<script lang="ts">
	import type { PageData } from './$types';
	import cat from '$lib/istockphoto-483799085-2048x2048.webp';

	export let data: PageData;

	let postPromise = data.posts;
</script>

<section>
	<h1 class="container mx-auto py-8 text-4xl">Blog</h1>
	<div class="container mx-auto">
		{#await postPromise then posts}
			{#if posts.empty}
				<p class="text-5xl font-thin">Jeszcze nie jesteśmy gotowi mówić o emojach! 🫣</p>
				<p class="mt-8">
					<img src={cat} alt="" />
				</p>
			{:else}
				{#each posts.docs as post}
					{@const postData = post.data()}
					<article>
						<a class="block" href="/blog/{post.id}">
							<h2 class="text-redwood-400 text-xl">{postData.title}</h2>
							<p>{postData.content.substr(0, 128)}</p>
						</a>
					</article>
				{/each}
			{/if}
		{/await}
	</div>
</section>
