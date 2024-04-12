<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	let postPromise = data.posts;
</script>

<section>
	<h1 class="container mx-auto py-8 text-4xl">Blog</h1>
	<div class="container mx-auto">
		{#await postPromise then posts}
			{#each posts.docs as post}
				{@const postData = post.data()}
				<article>
					<a class="block" href="/blog/{post.id}">
						<h2 class="text-redwood-400 text-xl">{postData.title}</h2>
						<p>{postData.content.substr(0, 128)}</p>
					</a>
				</article>
			{/each}
		{/await}
	</div>
</section>
