<script lang="ts">
	import { openApiStore } from '$lib';
	import { db, selectedSpec } from '$lib/db';

	function onSave(e: Event): void {
		console.log('Save button clicked');
		if (!$selectedSpec) {
			$selectedSpec = {
				name: 'New OpenAPI Spec',
				spec: $openApiStore
			};
		}
		console.log($selectedSpec);
		const newSpec = structuredClone($selectedSpec);
		newSpec.id = undefined;
		db.apiSpecs.put(newSpec);
	}
</script>

<button class="btn variant-ghost-success" on:click={onSave}> Save New </button>
