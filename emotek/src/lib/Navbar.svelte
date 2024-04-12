<script lang="ts">
	import type { NavLink } from './types/NavLink';

	export let navLinks: NavLink[];
</script>

<nav class="sticky top-0 bg-gray-800 p-4 shadow-lg">
	<div class="container mx-auto flex">
		<h1 class="text-2xl">
			<a href="/">Emotek.pl</a>
		</h1>
		<ol class="ml-auto flex gap-4">
			{#each navLinks as link}
				<li>
					<a href={link.link}>{link.name}</a>
				</li>
			{/each}
		</ol>
	</div>
</nav>
