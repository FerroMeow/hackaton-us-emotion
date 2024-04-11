<script>
	import Navbar from '$lib/Navbar.svelte';
	import { emotekLinks } from '$lib/emotek/emotekLinks';
</script>

<div class="min-h-[100vh]">
	<Navbar navLinks={emotekLinks}></Navbar>
	<slot />
</div>
