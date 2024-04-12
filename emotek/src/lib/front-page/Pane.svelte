<script lang="ts">
	export let title: string;
	export let accentColor: {
		bg: string;
		text: string;
	} = {
		bg: 'bg-white',
		text: 'text-black'
	};
</script>

<section class="p-8 py-16 {accentColor.bg} {accentColor.text}">
	<h2 class="container mx-auto pb-12 pt-4 text-5xl">{title}</h2>
	<div class="container mx-auto text-xl [&>*+*]:mt-4">
		<slot />
	</div>
</section>
