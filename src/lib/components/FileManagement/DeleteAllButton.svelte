<script lang="ts">
	import { newSpec } from '$lib/db';
	import { db, setSpec, type APISpec } from '$lib/db';
</script>

<button
	class="btn variant-ghost-error"
	on:click={async () => {
		if (confirm(`Are you sure you want to delete all saved specs?`)) {
			db.apiSpecs.clear();
			setSpec(newSpec);
		}
	}}
>
	Delete All
</button>
