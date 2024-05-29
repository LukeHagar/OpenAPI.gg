<script lang="ts">
	import { newSpec } from '$lib';
	import { db, setSpec, type APISpec } from '$lib/db';

	export let spec: APISpec;
</script>

<button
	class="btn variant-ghost-error"
	on:click={async () => {
		if (confirm(`Are you sure you want to delete '${spec.name}'?`)) {
			await db.apiSpecs.delete(spec.id);
			setSpec(newSpec);
		}
	}}
>
	Delete
</button>
