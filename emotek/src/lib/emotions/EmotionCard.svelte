<script lang="ts">
	export let emotion: any;
</script>

<a href="/emocje/{emotion.endpoint}" class="block">
	<article class="{emotion.bg} h-full min-w-36 max-w-64 rounded-3xl p-6 shadow-lg">
		<img src={emotion.src} alt={emotion.name} class="aspect-square h-auto w-full object-cover" />
		<h2 class="py-4 text-xl">{emotion.name}</h2>
		<p>{emotion.description}</p>
	</article>
</a>
