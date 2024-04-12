<script lang="ts">
	export let emotion: any;
</script>

<a href="/emocje/{emotion.endpoint}" class="block">
	<article class="{emotion.bg} min-w-36 max-w-64 rounded-3xl p-6 shadow-lg">
		<figure>
			<img src={emotion.src} alt={emotion.name} />
		</figure>
		<h2>{emotion.name}</h2>
		<p>{emotion.description}</p>
	</article>
</a>
