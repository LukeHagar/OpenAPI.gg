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
		db.apiSpecs.put($selectedSpec, $selectedSpec.id);
	}
</script>

<button class="btn variant-ghost-success" on:click={onSave}> Save </button>
