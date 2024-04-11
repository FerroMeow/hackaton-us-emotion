<script>
	import Navbar from '$lib/Navbar.svelte';
	import { adminLinks } from '$lib/admin/adminLinks';
	import '../../app.css';
</script>

<Navbar navLinks={adminLinks}></Navbar>
<slot />
