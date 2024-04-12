<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h2>Własny test rozpoznawania emocji</h2>
<form action="diagnoza" method="POST">
	<label for="emotions">Wybierz emocje:</label>

	<select id="emotions" name="emotions" multiple>
		{#each data.emotions as emotion}
			<option value={emotion.ang}>{emotion.pl}</option>
		{/each}
	</select>
	<br />
	<button type="submit">Rozpocznij swój test</button>
</form>
