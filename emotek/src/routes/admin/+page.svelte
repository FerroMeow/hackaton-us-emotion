<script lang="ts">
	import { onAuthStateChanged } from 'firebase/auth';
	import type { LayoutData } from './$types';
	import { redirect } from '@sveltejs/kit';
	export let data: LayoutData;
	const { app, auth } = data;
	let user: boolean;
</script>

panel admina
