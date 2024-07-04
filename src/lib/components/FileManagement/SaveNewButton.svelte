<script lang="ts">
	import { db, selectedSpec } from '$lib/db';

	function onSave(e: Event): void {
		console.log('Save button clicked');
		const newSpec = structuredClone($selectedSpec);
		newSpec.id = undefined;
		db.apiSpecs.put(newSpec);
	}
</script>

<button class="btn variant-ghost-success" on:click={onSave}> Save As </button>
