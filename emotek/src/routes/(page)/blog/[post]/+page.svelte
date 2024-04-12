<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';

	export let data: PageData;
	let postData = data.post.data();
	if (!postData) {
		goto('/blog/');
	}
	postData!;
</script>

<div>
	<div class="container mx-auto">
		<article>
			<h1 class="py-8 text-4xl">{postData?.title}</h1>
			<p>Post z dnia: {postData?.date.toDate().toLocaleString()}</p>
			<div>{postData?.content}</div>
		</article>
	</div>
</div>
