<script lang="ts">
	import { db, type APISpec } from '$lib/db';

	export let spec: APISpec;
</script>

<button
	class="btn variant-ghost-error"
	on:click={async () => {
		if (confirm(`Are you sure you want to delete '${spec.name}'?`)) {
			await db.apiSpecs.delete(spec.id);
		}
	}}
>
	Delete
</button>
